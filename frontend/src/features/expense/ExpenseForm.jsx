import React, { useState, useEffect } from 'react';

// Default empty form state
const INITIAL_STATE = {
  title: '',
  category: 'Food',
  amount: '',
  expenseDate: '',
  description: ''
};

export default function ExpenseForm({ editingExpense, onSubmitSuccess, onCancelEdit }) {
  // 1. Form state
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Populate form if we are editing an existing expense
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        category: editingExpense.category,
        amount: editingExpense.amount,
        expenseDate: editingExpense.expenseDate,
        description: editingExpense.description || ''
      });
      setError(null);
    } else {
      setFormData(INITIAL_STATE);
    }
  }, [editingExpense]);

  // 3. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 4. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setError(null);

    // Basic validation
    if (!formData.title || !formData.amount || !formData.expenseDate) {
      setError('Please fill in all required fields.');
      return;
    }

    if (Number(formData.amount) <= 0) {
      setError('Amount must be greater than zero.');
      return;
    }

    setIsSubmitting(true);
    try {
      const isUpdate = Boolean(editingExpense);
      const url = isUpdate
        ? `http://localhost:8080/api/expenses/${editingExpense.id}`
        : 'http://localhost:8080/api/expenses';

      const method = isUpdate ? 'PUT' : 'POST';

      // Send request to backend
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          // Since Auth isn't ready yet, we might get 401 later, but let's try standard fetch first.
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || 'Failed to save expense');
      }

      // Success! Reset form and notify parent
      setFormData(INITIAL_STATE);
      onSubmitSuccess();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong while saving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mb-20" style={{ borderTop: '4px solid var(--primary-color)' }}>
      <h3 style={{ marginBottom: '15px' }}>
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h3>

      {error && (
        <div className="alert alert-danger" style={{ padding: '10px', background: '#f8d7da', color: '#842029', borderRadius: '5px', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Lunch with friends"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Amount ($) *</label>
            <input
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Date *</label>
            <input
              name="expenseDate"
              type="date"
              lang="en"
              value={formData.expenseDate}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional details..."
            rows="2"
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (editingExpense ? 'Update Expense' : 'Add Expense')}
          </button>

          {editingExpense && (
            <button type="button" className="btn-secondary" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

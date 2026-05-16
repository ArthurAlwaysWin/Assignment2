import React, { useState, useEffect } from 'react';
import api from '../../api/request';

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
    e.preventDefault();
    setError(null);

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
      if (editingExpense) {
        await api.put(`/expenses/${editingExpense.id}`, formData);
      } else {
        await api.post('/expenses', formData);
      }

      setFormData(INITIAL_STATE);
      onSubmitSuccess();
    } catch (err) {
      console.error(err);
      // Axios 通常把后端的错误信息放在 err.response.data 中
      setError(err.response?.data || err.message || 'Something went wrong while saving.');
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

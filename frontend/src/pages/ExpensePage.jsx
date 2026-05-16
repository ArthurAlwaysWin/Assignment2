import React, { useState, useEffect } from 'react';
import SearchBar from '../features/expense/SearchBar';
import ExpenseFilter from '../features/expense/ExpenseFilter';
import ExpenseForm from '../features/expense/ExpenseForm';
import ExpenseSummary from '../features/expense/ExpenseSummary';
import MonthlyTrend from '../features/expense/MonthlyTrend';
import ExpenseList from '../features/expense/ExpenseList';

export default function ExpensePage() {
  // 1. All our states (data, filters, etc.)
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ startDate: '', endDate: '', category: '' });
  const [editingExpense, setEditingExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch expenses from backend
  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      // Temporarily use direct fetch to localhost:8080 since request.js might redirect to login if auth is incomplete.
      // If we use Member D's api/request.js, we would do: const res = await api.get('/expenses');
      const response = await fetch('http://localhost:8080/api/expenses');
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Run once when component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  // 3. Apply Filters and Search term whenever they or the data changes
  useEffect(() => {
    let result = expenses;

    // A. Apply Search Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(ex =>
        ex.title.toLowerCase().includes(lowerSearch) ||
        ex.category.toLowerCase().includes(lowerSearch) ||
        (ex.description && ex.description.toLowerCase().includes(lowerSearch))
      );
    }

    // B. Apply Category & Date Filters
    if (filters.category) {
      result = result.filter(ex => ex.category === filters.category);
    }
    if (filters.startDate) {
      result = result.filter(ex => ex.expenseDate >= filters.startDate);
    }
    if (filters.endDate) {
      result = result.filter(ex => ex.expenseDate <= filters.endDate);
    }

    setFilteredExpenses(result);
  }, [expenses, searchTerm, filters]);

  // 4. Handle Deleting an Expense
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/expenses/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
      // Refresh the list after successful delete
      fetchExpenses();
      // If we were editing the deleted expense, cancel edit mode
      if (editingExpense && editingExpense.id === id) {
        setEditingExpense(null);
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting expense.');
    }
  };

  return (
    <div className="home-page" style={{ padding: '20px 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Expense Management</h1>

      {error && (
        <div className="alert alert-danger" style={{ textAlign: 'center' }}>
          {error}
        </div>
      )}

      {/* The main layout: Left side (Form & Filters), Right side (Stats & List) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

        <div>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <ExpenseForm
            editingExpense={editingExpense}
            onSubmitSuccess={() => {
              setEditingExpense(null);
              fetchExpenses();
            }}
            onCancelEdit={() => setEditingExpense(null)}
          />

          <ExpenseFilter
            onFilterApply={(f) => setFilters(f)}
            onFilterClear={() => setFilters({ startDate: '', endDate: '', category: '' })}
          />
        </div>

        <div>
          {isLoading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading expenses...</p>
            </div>
          ) : (
            <>
              <ExpenseSummary expenses={filteredExpenses} />

              <MonthlyTrend expenses={filteredExpenses} />

              <ExpenseList
                expenses={filteredExpenses}
                onEdit={(expense) => {
                  setEditingExpense(expense);
                  // Optional: scroll to top smoothly when edit is clicked
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDelete={handleDelete}
              />
            </>
          )}
        </div>

      </div>
    </div>
  );
}

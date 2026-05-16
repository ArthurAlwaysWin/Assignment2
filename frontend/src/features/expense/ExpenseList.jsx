import React from 'react';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div
        className="card text-center"
        style={{ padding: '40px 20px', color: 'var(--secondary-color)' }}
      >
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>No expenses found.</p>
        <p>Let's start tracking your expenses by adding one above!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '15px' }}>Expense History</h3>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

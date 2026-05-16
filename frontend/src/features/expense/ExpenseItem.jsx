import React from 'react';

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  // transfrom mode
  const formattedAmount = Number(expense.amount).toFixed(2);

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.06)';
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
          <strong style={{ fontSize: '18px' }}>{expense.title}</strong>
          <span style={{
            color: '#666',
            fontSize: '12px',
            background: '#e9ecef',
            padding: '2px 8px',
            borderRadius: '12px'
          }}>
            {expense.category}
          </span>
        </div>
        <div style={{ color: '#6c757d', fontSize: '14px' }}>
          {expense.expenseDate} {expense.description && `| ${expense.description}`}
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontWeight: 'bold',
          color: 'var(--danger-color)',
          fontSize: '20px',
          marginBottom: '8px'
        }}>
          ${formattedAmount}
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              backgroundColor: '#ffc107',
              color: '#000'
            }}
            onClick={() => onEdit(expense)}
          >
            Edit
          </button>
          <button
            className="btn-danger"
            style={{ padding: '6px 12px', fontSize: '13px' }}
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this expense?')) {
                onDelete(expense.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

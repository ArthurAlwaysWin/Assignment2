import React from 'react';

export default function ExpenseSummary({ expenses }) {
  // Calculate total expenses
  const totalAmount = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    const amount = Number(expense.amount);
    acc[expense.category] = (acc[expense.category] || 0) + amount;
    return acc;
  }, {});

  return (
    <div className="card mb-20" style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
      <h3 style={{ marginBottom: '15px' }}>Expense Summary</h3>

      {/* Total Amount Display */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', color: 'var(--secondary-color)' }}>Total Expenses</div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
          ${totalAmount.toFixed(2)}
        </div>
      </div>

      {/* Category Breakdown */}
      {expenses.length > 0 && (
        <div>
          <div style={{ fontSize: '14px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
            By Category
          </div>
          <div className="overview-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <div
                key={category}
                style={{
                  background: '#fff',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ fontSize: '12px', color: '#666' }}>{category}</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--danger-color)' }}>
                  ${amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

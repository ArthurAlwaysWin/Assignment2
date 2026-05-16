import React from 'react';

export default function MonthlyTrend({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return null; // Don't render anything if there's no data
  }

  // Group expenses by month (YYYY-MM format)
  const monthTotals = expenses.reduce((acc, expense) => {
    // Extract YYYY-MM from the date string (e.g., "2026-05-15" -> "2026-05")
    const monthKey = expense.expenseDate.substring(0, 7);
    const amount = Number(expense.amount);
    acc[monthKey] = (acc[monthKey] || 0) + amount;
    return acc;
  }, {});

  // Sort months chronologically
  const sortedMonths = Object.entries(monthTotals).sort(([monthA], [monthB]) =>
    monthA.localeCompare(monthB)
  );

  return (
    <div className="card mb-20">
      <h3 style={{ marginBottom: '15px' }}>Monthly Trend</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sortedMonths.map(([month, amount]) => (
          <div
            key={month}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '6px'
            }}
          >
            <strong>{month}</strong>
            <span style={{ fontWeight: 'bold' }}>${amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/request';

export default function HomePage() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/expenses')
      .then((res) => setExpenses(res.data))
      .catch(() => setExpenses([]))
      .finally(() => setLoading(false));
  }, []);

  // calculate current month total
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyExpenses = expenses.filter(
    (e) => e.expenseDate && e.expenseDate.startsWith(currentMonth)
  );
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  // calculate category breakdown for current month
  const categoryTotals = monthlyExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  return (
    <div className="home-page">
      <h1>Welcome, {user?.username}!</h1>

      <div className="overview-cards">
        <div className="card">
          <h3>This Month</h3>
          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : (
            <>
              <p className="overview-amount">${monthlyTotal.toFixed(2)}</p>
              <p className="text-muted">{monthlyExpenses.length} expense(s)</p>
            </>
          )}
        </div>

        <div className="card">
          <h3>Total Records</h3>
          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : (
            <>
              <p className="overview-amount">{expenses.length}</p>
              <p className="text-muted">all time expenses</p>
            </>
          )}
        </div>
      </div>

      {!loading && Object.keys(categoryTotals).length > 0 && (
        <div className="card">
          <h3>This Month by Category</h3>
          <div className="category-list">
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <div key={category} className="category-row">
                <span>{category}</span>
                <span>${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="home-actions">
        <Link to="/expenses">
          <button>Go to Expenses</button>
        </Link>
      </div>
    </div>
  );
}

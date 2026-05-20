import { useState } from 'react';

export default function ExpenseFilter({ onFilterApply, onFilterClear }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');

  const handleApply = () => {
    onFilterApply({ startDate, endDate, category });
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setCategory('');
    onFilterClear();
  };

  return (
    <div className="card mb-20">
      <h3 style={{ marginBottom: '15px' }}>Filter Expenses</h3>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>

        <div className="form-group" style={{ marginBottom: 0, flex: '1', minWidth: '150px' }}>
          <label>Start Date</label>
          <input
            type="date"
            lang="en"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0, flex: '1', minWidth: '150px' }}>
          <label>End Date</label>
          <input
            type="date"
            lang="en"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0, flex: '1', minWidth: '150px' }}>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleApply}>Apply</button>
          <button className="btn-secondary" onClick={handleClear}>Clear</button>
        </div>

      </div>
    </div>
  );
}

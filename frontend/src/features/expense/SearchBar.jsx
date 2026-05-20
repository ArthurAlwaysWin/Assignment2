

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="card mb-20" style={{ padding: '15px' }}>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <input
          type="text"
          placeholder="Search expenses by title, category, or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            fontSize: '16px'
          }}
        />
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import api from "../../api/request.js";

export default function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId === "all") {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(
          activities.filter((a) => String(a.userId) === selectedUserId)
      );
    }
  }, [selectedUserId, activities]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/activities");
      setActivities(res.data);
      setFilteredActivities(res.data);
    } catch (err) {
      setError("Failed to load activities.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      // users list is optional for filtering
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this activity record?")) return;
    try {
      await api.delete(`/admin/activities/${id}`);
      setActivities((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert("Failed to delete activity.");
    }
  };

  const formatTimestamp = (ts) => {
    if (!ts) return "-";
    return new Date(ts).toLocaleString("en-AU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <div className="loading">Loading activities...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
      <div className="activity-log">
        <div className="filter-bar">
          <label htmlFor="user-filter">Filter by user:</label>
          <select
              id="user-filter"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="all">All Users</option>
            {users.map((u) => (
                <option key={u.id} value={String(u.id)}>
                  {u.username}
                </option>
            ))}
          </select>
        </div>

        {filteredActivities.length === 0 ? (
            <p className="empty-message">No activity records found.</p>
        ) : (
            <table className="data-table">
              <thead>
              <tr>
                <th>Time</th>
                <th>User ID</th>
                <th>Action</th>
                <th>Detail</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              {filteredActivities.map((a) => (
                  <tr key={a.id}>
                    <td>{formatTimestamp(a.timestamp)}</td>
                    <td>{a.userId}</td>
                    <td>
                  <span className={`action-badge action-${a.action.toLowerCase()}`}>
                    {a.action}
                  </span>
                    </td>
                    <td>{a.detail || "-"}</td>
                    <td>
                      <button
                          className="btn-delete-small"
                          onClick={() => handleDelete(a.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </div>
  );
}
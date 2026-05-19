import { useState, useEffect } from "react";
import api from "../../api/request.js";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ email: "", role: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({ email: user.email, role: user.role });
  };

  const handleEditSave = async () => {
    try {
      await api.put(`/admin/users/${editingUser.id}`, editForm);
      setUsers((prev) =>
          prev.map((u) =>
              u.id === editingUser.id ? { ...u, ...editForm } : u
          )
      );
      setEditingUser(null);
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  const handleDelete = async (id) => {
    const target = users.find((u) => u.id === id);
    if (target && target.username === "admin") {
      alert("You cannot delete the admin account.");
      return;
    }
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
      <div className="user-management">
        {editingUser && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Edit User: {editingUser.username}</h3>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                      }
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                      value={editForm.role}
                      onChange={(e) =>
                          setEditForm({ ...editForm, role: e.target.value })
                      }
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button className="btn-primary" onClick={handleEditSave}>
                    Save
                  </button>
                  <button className="btn-secondary" onClick={() => setEditingUser(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
        )}

        {users.length === 0 ? (
            <p className="empty-message">No users found.</p>
        ) : (
            <table className="data-table">
              <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                  <span className={`role-badge role-${u.role.toLowerCase()}`}>
                    {u.role}
                  </span>
                    </td>
                    <td>
                      <button
                          className="btn-edit-small"
                          onClick={() => handleEditClick(u)}
                      >
                        Edit
                      </button>
                      <button
                          className="btn-delete-small"
                          onClick={() => handleDelete(u.id)}
                          disabled={u.username === "admin"}
                          title={u.username === "admin" ? "Cannot delete admin account" : ""}
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
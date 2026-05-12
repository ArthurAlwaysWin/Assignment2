import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/request';

export default function ProfilePage() {
  const { user, login, token } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const showMessage = (msg) => {
    setMessage(msg);
    setError('');
  };

  const showError = (msg) => {
    setError(msg);
    setMessage('');
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showError('Email cannot be empty.');
      return;
    }
    try {
      const res = await api.put('/auth/profile', { email });
      login(token, { ...user, email: res.data.email });
      showMessage('Email updated successfully.');
    } catch (err) {
      showError(err.response?.data || 'Failed to update email.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      showError('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      showError('New password must be at least 6 characters.');
      return;
    }
    try {
      await api.put('/auth/password', { oldPassword, newPassword });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showMessage('Password changed successfully.');
    } catch (err) {
      showError(err.response?.data || 'Failed to change password.');
    }
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <div className="card">
        <h3>Account Info</h3>
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <h3>Update Email</h3>
        <form onSubmit={handleUpdateEmail}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save Email</button>
        </form>
      </div>

      <div className="card">
        <h3>Change Password</h3>
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import UserManagement from "../features/admin/UserManagement.jsx";
import ActivityLog from "../features/admin/ActivityLog.jsx";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");

  return (
      <div className="admin-page">
        <h1>Admin Panel</h1>

        <div className="tab-bar">
          <button
              className={activeTab === "users" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("users")}
          >
            User Management
          </button>
          <button
              className={activeTab === "activities" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("activities")}
          >
            Activity Log
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "users" ? <UserManagement /> : <ActivityLog />}
        </div>
      </div>
  );
}
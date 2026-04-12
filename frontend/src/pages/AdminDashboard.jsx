import React from 'react'
import { Link } from "react-router-dom";

const AdminDashboard = ({ isAdmin }) => {

  // ✅ get username (optional)
  const adminUser = localStorage.getItem("username");

  return (
    <div style={{ padding: "20px" }}>

      {/* ✅ Greeting */}
      <h2>
        Hello {adminUser ? adminUser : "Admin"} 👋
      </h2>

      {/* ✅ Show only if admin */}
      {isAdmin && (
        <div style={{ marginTop: "20px" }}>
          <Link to="/admin/category_add">
            <button style={{
              padding: "10px 15px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              ➕ Add Category
            </button>
          </Link>
        </div>
      )}

    </div>
  )
}

export default AdminDashboard
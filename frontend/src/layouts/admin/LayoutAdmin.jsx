import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import './LayoutAdmin.css';

const LayoutAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      {sidebarOpen && (
        <aside className="admin-sidebar">
          <h3>ADMIN</h3>
          <nav className="admin-nav">
            <ul>
              <li>
                <NavLink to="/admin/accounts" className="admin-nav-link">
                  Quản lý tài khoản
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/books" className="admin-nav-link">
                  Quản lý sách
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/statistics" className="admin-nav-link">
                  Thống kê
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/logout" className="admin-nav-link">
                  Đăng xuất
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
      )}

      <main className="admin-main">
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Ẩn sidebar" : "Hiện sidebar"}
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;

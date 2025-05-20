import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaUser, FaShoppingCart, FaThList } from "react-icons/fa";
import './LayoutAdmin.css';
import Logo from "../../../public/ThuongDinhLib.png"
const LayoutAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className={`admin-layout ${sidebarOpen ? 'with-sidebar' : 'no-sidebar'}`}>
      <div className="sidebar-toggle--btn">
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaThList/>
        </button>
      </div>
        <aside className={`admin-sidebar ${!sidebarOpen ? 'hide' : ''}`}>

          <div className="admin-sidebar__header">
            <img src={Logo} alt="logoImg" className="logo__admin"/>
            <div className="admin-toggle">
              <h3 className="admin-sidebar__title">Admin</h3>
            </div>
            
          </div>
          
          <nav className="admin-nav">
            <ul>
              <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                <NavLink to="/admin/accounts" className="admin-nav-link">
                  Quản lý tài khoản
                </NavLink>
                
              </li>
              <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                <NavLink to="/admin/books" className="admin-nav-link">
                  Quản lý sách
                </NavLink>
              </li>
              <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                <NavLink to="/admin/statistics" className="admin-nav-link">
                  Quản lý danh mục
                </NavLink>
              </li>
              <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                <NavLink to="/admin/logout" className="admin-nav-link">
                  Đăng xuất
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

      

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;

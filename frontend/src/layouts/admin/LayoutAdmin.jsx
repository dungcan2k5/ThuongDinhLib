import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { GrContactInfo } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import "./LayoutAdmin.css";
import Logo from "../../../public/ThuongDinhLib.png";
const LayoutAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const user = {
    name: "Admin",
    email: "thuongdinhlib@.com",
  };
  return (
    <div
      className={`admin-layout ${sidebarOpen ? "with-sidebar" : "no-sidebar"}`}
    >
      <div className="sidebar-toggle--btn"></div>
      <aside className={`admin-sidebar ${!sidebarOpen ? "hide" : ""}`}>
        <div className="admin-sidebar__header">
          <img src={Logo} alt="logoImg" className="logo__admin" />
        </div>

        <nav className="admin-nav">
          <ul>
            <li>
              <NavLink to="/admin/admin-dashboard" className="admin-nav-link">
                <LuLayoutDashboard />
                Dashboard
              </NavLink>
            </li>
            <li className="admin-nav-item">
              <div
                className="admin-nav-link admin-nav-link--toggle"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              >
                <FiUsers />
                Quản lý tài khoản
                <FiChevronDown
                  className={`chevron-icon ${
                    isAccountMenuOpen ? "rotate" : ""
                  }`}
                />
              </div>
              {isAccountMenuOpen && (
                <ul className="admin-submenu">
                  <li>
                    <NavLink
                      to="/admin/accounts"
                      className="admin-submenu-link"
                    >
                      <RiAdminLine
                        style={{ color: "#333", marginRight: "1rem" }}
                      />
                      Nhân viên
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/customers"
                      className="admin-submenu-link"
                    >
                      <CiUser style={{ color: "#333", marginRight: "1rem" }} />
                      Khách hàng
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/admin/books" className="admin-nav-link">
                <GoBook />
                Quản lý sách
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/category" className="admin-nav-link">
                <MdOutlineCategory />
                Quản lý danh mục
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/statistics" className="admin-nav-link">
                <MdOutlineCategory />
                Thống kê
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/logout" className="admin-nav-link">
                <IoIosLogOut />
                Đăng xuất
              </NavLink>
            </li>
          </ul>
        </nav>
        <div
          style={{
            marginTop: "40vh",
            borderTop: "solid 1px #333",
            display: "flex",
            gap: "10px",
            paddingTop: "30px",
          }}
        >
          <div>
            <GrContactInfo
              style={{ fontSize: "3rem", margin: "1.5rem auto" }}
            />
          </div>

          <div>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;

import { Link } from "react-router-dom";
import "./SidebarMobile.css";
import Logo from "../../../../public/ThuongDinhLib.png";
const SidebarMobile = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              <img src={Logo} alt="logoImg" className="side-logo" />
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={toggleSidebar}>
              Giỏ hàng
            </Link>
          </li>
          <li>
            <Link to="/dashboard" onClick={toggleSidebar}>
              Tài khoản
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Đăng xuất
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default SidebarMobile;

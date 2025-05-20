import { Link, useNavigate } from "react-router-dom";
import "./SidebarMobile.css";
import Logo from "../../../../public/ThuongDinhLib.png";
import { useAuth } from "../../../context/AuthContext";
const SidebarMobile = ({ isOpen, toggleSidebar, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { logout } = useAuth();

  return (
    <>
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
            <Link to="/user-dashboard" onClick={toggleSidebar}>
              Tài khoản
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  navigate("/");
                  logout();
                  toggleSidebar();
                }}
                className="logout-btn"
              >
                Đăng xuất
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  toggleSidebar();
                }}
                className="logout-btn"
              >
                Đăng nhập
              </button>
            )}
          </li>
        </ul>
      </div>

      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default SidebarMobile;

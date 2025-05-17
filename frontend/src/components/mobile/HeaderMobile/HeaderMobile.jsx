import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderMobile.css";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import SidebarMobile from "../SidebarMobile/SidebarMobile";
import avatarImg from "../../../../public/avatar.png";
import { useAuth } from "../../../context/AuthContext";
const navigation = [
  { name: "Tài khoản", href: "/user-dashboard" },
  { name: "Đơn mua", href: "/orders" },
  { name: "Thanh toán", href: "/checkout" },
];

const HeaderMobile = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header-mobile">
        <div className="header-mobile__nav" onClick={toggleSidebar}>
          <HiMiniBars3CenterLeft />
        </div>

        <div className="header-mobile__search">
          <div className="header-mobile__search--icon">
            <IoSearchOutline />
          </div>
          <div>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="header-mobile__search--input"
            />
          </div>
        </div>

        <div className="header-mobile__user" ref={dropdownRef}>
          <div>
            {isLoggedIn ? (
              <>
                <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                  <img src={avatarImg} alt="avatarImg" />
                </button>
                <div
                  className={`header-mobile__user--nav ${
                    isDropDownOpen ? "active" : ""
                  }`}
                >
                  <ul>
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="user-nav__item">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <div className="user-nav__item">
                        {" "}
                        <button
                          onClick={() => {
                            logout();
                            setIsLoggedIn(false);
                            setIsDropDownOpen(false);
                          }}
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link to="/login">
                <FaRegCircleUser />
              </Link>
            )}
          </div>
        </div>
      </div>

      <SidebarMobile isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default HeaderMobile;

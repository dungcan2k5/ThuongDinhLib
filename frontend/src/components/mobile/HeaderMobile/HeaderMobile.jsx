import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderMobile.css";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import SidebarMobile from "../SidebarMobile/SidebarMobile";
import avatarImg from "../../../../public/avatar.png";
import { useAuth } from "../../../context/AuthContext";
import { getApiUrl } from "../../../utils/apiUtils";
import { searchBooks } from "../../../services/bookService";
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

  // tim kiem
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const results = await searchBooks(searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error("Lỗi tìm kiếm sách:", error);
      }
    };

    const delay = setTimeout(() => fetchResults(), 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="header-mobile">
        <div className="header-mobile__nav" onClick={toggleSidebar}>
          <HiMiniBars3CenterLeft />
        </div>

        <div className="header-mobile__search" ref={searchRef}>
          <div className="header-mobile__search--icon">
            <IoSearchOutline />
          </div>
          <div>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="header-mobile__search--input"
              value={searchTerm}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {isFocused && searchResults.length > 0 && (
            <ul className="header-mobile__search-suggestions">
              {searchResults.map((book) => (
                <li
                  key={book._id}
                  className="header-mobile__search-suggestion-item"
                >
                  <Link
                    to={`/book/${book._id}`}
                    onClick={() => {
                      setSearchTerm("");
                      setIsFocused(false);
                      setSearchResults([]);
                    }}
                  >
                    <div className="suggestion-content">
                      <img
                        src={`${getApiUrl()}${book.image}`}
                        alt={book.title}
                        width={60}
                      />
                      <div className="suggestion-info">
                        <strong>{book.title}</strong>
                        <p>{book.author}</p>
                        <p style={{ color: "green" }}>
                          {parseFloat(
                            book.price?.$numberDecimal || book.price
                          ).toLocaleString()}
                          ₫
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
                            navigate("/");
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

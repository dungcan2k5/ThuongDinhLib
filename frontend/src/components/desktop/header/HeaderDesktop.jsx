import { useState, useEffect, useRef } from "react";
import { searchBooks } from "../../../services/bookService"; // Đảm bảo import đúng đường dẫn
import { getApiUrl } from "../../../utils/apiUtils";
import { Link } from "react-router-dom";
import { FaUser, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./HeaderDesktop.css"
import loginCheck from "../../../utils/loginCheck";
import BookInfor from "../BookInfor/BookInfor";
import { Navigate } from "react-router-dom";
const HeaderDesktop = () => {
    const [logined, setLogined] = useState(true)
    const [userFocus, setUserFocus] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            if (searchTerm.trim() === "") {
                setResults([]);
                return;
            }
            try {
                const books = await searchBooks(searchTerm);
                setResults(books);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        const debounce = setTimeout(() => fetchResults(), 500);
        return () => clearTimeout(debounce);
    }, [searchTerm]);

    useEffect(() => {
        if (!loginCheck()) {setLogined(false)}
    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        setLogined(false)
    }

    const userNav = () => (
        <ul className="header__right-list">
            <li className="header__right-item"><Link to="/">Home</Link></li>
            <li className="header__right-item"><Link to="/cart">Giỏ hàng</Link></li>
            <li className="header__right-item"><Link to="/dashboard">Tài khoản</Link></li>
            <li className="header__right-item"><Link to="/history">Đơn mua</Link></li>
            <li className="header__right-item"><Link to="/" onClick={logout}>Đăng xuất</Link></li>
        </ul>
    );

    return (
        <div className="header">
            {selectedBook && (
                <div className="header__overlay" onClick={() => setSelectedBook(null)}>
                    <BookInfor book={selectedBook} />
                </div>
            )}
            <div className="header__left">
                <a href="/"><img className='header__logo' src="/ThuongDinhLib.png" alt="Logo"/></a>
            </div>
            <div className="header__center">
                <div className="header__search-bar" 
                onFocus={() => {
                    clearTimeout(timeoutRef.current);
                    setIsFocused(true);
                }}
                onBlur={() => {
                    timeoutRef.current = setTimeout(() => setIsFocused(false), 200);
                }}
                tabIndex={-1}
                >
                    <input
                        className='header__input-field'
                        type="text"
                        placeholder="Nhập nội dung bạn muốn tìm kiếm ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                    />
                    {isFocused && searchTerm && (
                        <div className={'header__search-dropdown'}>
                            {results.length === 0 ? (
                                <div className="header__search-item" style={{height: "100%", padding: "0"}}>Không tìm thấy kết quả nào</div>
                            ) : (
                                results.map((book) => (
                                    <div key={book._id} className="header__search-item" tabIndex={0} onClick={() => {console.log("Clicked book:", book); setSelectedBook(book)}}>
                                        <div>
                                            <img src={`${getApiUrl()}${book.image}`} alt={book.title} width={50} height={75} />
                                            <div className="header__search-item-info">
                                                <strong>{book.title}</strong>
                                                <div style={{ color: '#E9A319', marginTop: "8px" }}>{book.author}</div>
                                                <div style={{marginTop: 'auto' }}>{book.price.toLocaleString('vi-VN')} đ</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    <div
                className="header__search-button"
                onClick={() => {
                    if (searchTerm.trim() !== "") {
                    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
                    }
                    }}
                        >
                            <FaSearch className="header__search-icon"/>
                    </div>
                </div>
            </div>
            <div className="header__right">
                {logined ? (
                    <>
                        <div 
                            onMouseEnter={() => {
                                clearTimeout(timeoutRef.current);
                                setUserFocus(true);
                            }}
                            onMouseLeave={() => {
                                timeoutRef.current = setTimeout(() => setUserFocus(false), 100);
                            }}
                        >
                            <FaUser className="header__right-icon" />
                            {userFocus && (
                                <div className={`header__right-nav ${userFocus ? "show" : ""}`}>
                                    {userNav()}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <a href="/login" className="header__login-text">Đăng nhập</a>
                )}
            </div>
        </div>
    );
};

export default HeaderDesktop;

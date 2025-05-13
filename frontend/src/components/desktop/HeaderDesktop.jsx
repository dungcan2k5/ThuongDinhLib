import { useState, useEffect, useRef } from "react";
import { searchBooks } from "../../services/bookService"; // Đảm bảo import đúng đường dẫn
import { getApiUrl } from "../../utils/apiUtils";
import "./HeaderDesktop.css"
const HeaderDesktop = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const timeoutRef = useRef(null);

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

    return (
        <div className="header">
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
                                    <div key={book._id} className="header__search-item">
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
                    <div className='header__search-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFFFF"><path d="M792-120.67 532.67-380q-30 25.33-69.64 39.67Q423.39-326 378.67-326q-108.44 0-183.56-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.5-75.17 107.33 0 182.16 75.17 74.84 75.17 74.84 182.27 0 43.23-14 82.9-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79.17 0 134.58-55.83Q568-504.33 568-583.33q0-79-55.42-134.84Q457.17-774 378-774q-79.72 0-135.53 55.83-55.8 55.84-55.8 134.84t55.8 134.83q55.81 55.83 135.53 55.83Z"/></svg>
                    </div>
                </div>
            </div>
            <div className="header__right">
                USER
            </div>
        </div>
    );
};

export default HeaderDesktop;

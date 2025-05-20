import React, { useEffect, useState } from "react";
import getCategory from "../../../services/bookCategoryGet";
import categorySearch from "../../../services/categorySearch";
import GetBook from "../../../services/GetBook";
import { getApiUrl } from "../../../utils/apiUtils";
import BookInfor from "../BookInfor/BookInfor";
import './h.css';

const HDesktop = () => {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [currentPage, setCurrentPage] = useState(1);
    const [animating, setAnimating] = useState(false);
    const [animationClass, setAnimationClass] = useState("");

    const [bookInforState, setBookInforState] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const booksPerPage = 8;

    useEffect(() => {
        const fetchInitial = async () => {
            const res = await getCategory();
            setCategories(["Tất cả", ...res]);

            const allBooks = await GetBook();
            setBooks(allBooks);
        };

        fetchInitial();
    }, []);

    const handleCategoryChange = async (e) => {
        setCurrentPage(1);
        const category = e.target.value;
        setSelectedCategory(category);

        if (category === "Tất cả") {
            const allBooks = await GetBook();
            setBooks(allBooks);
        } else {
            const res = await categorySearch(category);
            setBooks(res);
        }
    };

    const getBooksForPage = (page) => {
        const start = (page - 1) * booksPerPage;
        return books.slice(start, start + booksPerPage);
    };

    const handlePageChange = (page) => {
        if (page === currentPage || animating) return;

        const direction = page > currentPage ? 'right' : 'left';
        setAnimationClass(`slide-out-${direction}`);
        setAnimating(true);

        setTimeout(() => {
            setCurrentPage(page);
            setAnimationClass(`slide-in-${direction}`);
        }, 300);

        setTimeout(() => {
            setAnimationClass('');
            setAnimating(false);
        }, 600);
    };

    const totalPages = Math.ceil(books.length / booksPerPage);

    // Tạo danh sách số trang hiển thị gọn (trong khoảng 5 nút)
    const getPaginationRange = () => {
        const range = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            end = Math.min(totalPages, maxVisible);
        } else if (currentPage >= totalPages - 2) {
            start = Math.max(1, totalPages - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <div className="categoryPage">
            {bookInforState && selectedBook && (
                <div className="overlay" onClick={() => setBookInforState(false)}>
                    <BookInfor book={selectedBook} />
                </div>
            )}

            <div className="categoryPage__header">
                <h2 className="categoryPage__title">Thể Loại</h2>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="categoryPage__select"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {books.length === 0 ? (
                <p className="categoryPage__empty">Không có sách trong thể loại này</p>
            ) : (
                <div className={`categoryPage__list ${animationClass}`}>
                    {getBooksForPage(currentPage).map((book) => (
                        <div
                            key={book._id}
                            className="categoryPage__card"
                            onClick={() => {
                                setBookInforState(true);
                                setSelectedBook(book);
                            }}
                        >
                            <img src={`${getApiUrl()}${book.image}`} alt={book.title} />
                            <div className="categoryPage__info">
                                <h3>{book.title}</h3>
                                <h4>{book.author}</h4>
                                <p>{Number(book.price?.$numberDecimal || 0).toLocaleString('vi-VN')} đ</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {totalPages > 1 && ( 
                <div className="categoryPage__pagination">
                    <button className = "categoryPage__movePage"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        «
                    </button>

                    {getPaginationRange().map((num) => (
                        <button
                            key={num}
                            className={`categoryPage__pageBtn ${num === currentPage ? 'active' : ''}`}
                            onClick={() => handlePageChange(num)}
                        >
                            {num}
                        </button>
                    ))}

                    <button className = "categoryPage__movePage"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        »
                    </button>
                </div>
            )}
        </div>
    );
};

export default HDesktop;
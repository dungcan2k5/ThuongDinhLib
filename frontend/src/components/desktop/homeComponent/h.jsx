import React, { useEffect, useState } from "react";
import getCategory from "../../../services/bookCategoryGet";
import categorySearch from "../../../services/categorySearch";
import { getApiUrl } from "../../../utils/apiUtils";
import BookInfor from "../BookInfor/BookInfor";
import './h.css';

const HDesktop = () => {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [animating, setAnimating] = useState(false);
    const [animationClass, setAnimationClass] = useState("");

    const [bookInforState, setBookInforState] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const booksPerPage = 8;

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getCategory();
            setCategories(res);

            if (res && res.length > 0) {
                setSelectedCategory(res[0]);
                const booksRes = await categorySearch(res[0]);
                setBooks(booksRes);
                setCurrentPage(1);
            }
        };

        fetchCategory();
    }, []);

    const handleCategoryChange = async (e) => {
        setCurrentPage(1);
        const category = e.target.value;
        setSelectedCategory(category);
        const res = await categorySearch(category);
        setBooks(res);
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

    return (
        <div className="categoryPage">
            {bookInforState && selectedBook && (
                <div className="overlay" onClick={() => setBookInforState(false)}>
                    <BookInfor book={selectedBook} />
                </div>
            )}

            <div className="categoryPage__header">
                <h2 className="categoryPage__title">Thể Loại</h2>
                <select value={selectedCategory} onChange={handleCategoryChange} className="categoryPage__select">
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
                                <p>{book.author}</p>
                                <p>{Number(book.price?.$numberDecimal || 0).toLocaleString('vi-VN')} đ</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="categoryPage__pagination">
                {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        className={`categoryPage__pageBtn ${num === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(num)}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HDesktop;
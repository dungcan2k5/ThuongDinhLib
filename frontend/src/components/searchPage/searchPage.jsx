import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchBooks } from "../../services/bookService";
import { getApiUrl } from "../../utils/apiUtils";
import BookInfor from "../desktop/BookInfor/BookInfor";
import "./SearchPage.css";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayBooks, setDisplayBooks] = useState([]);
    const [showBookInfor, setShowBookInfor] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [animationClass, setAnimationClass] = useState("");

    const query = searchParams.get("query");

    const booksPerPage = 12;
    const totalPages = Math.ceil(books.length / booksPerPage);

    const getBooksForPage = (page) => {
        const indexOfLast = page * booksPerPage;
        const indexOfFirst = indexOfLast - booksPerPage;
        return books.slice(indexOfFirst, indexOfLast);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                try {
                    setLoading(true);
                    const res = await searchBooks(query);
                    setBooks(res);
                    setCurrentPage(1);
                    setDisplayBooks(res.slice(0, booksPerPage));
                } catch (err) {
                    console.error("Search failed", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [query]);

    const handlePageChange = (page) => {
        if (page === currentPage) return;

        const direction = page > currentPage ? "left" : "right";

        // Bắt đầu trượt ra
        setAnimationClass(`slide-out-${direction}`);

        setTimeout(() => {
            // Cập nhật dữ liệu
            const newBooks = getBooksForPage(page);
            setDisplayBooks(newBooks);
            setCurrentPage(page);

            // Trượt vào
            setAnimationClass(`slide-in-${direction}`);

            // Gỡ class sau khi xong animation
            setTimeout(() => {
                setAnimationClass("");
            }, 300);
        }, 300); // khớp thời gian với CSS
    };

    return (
        <div className="searchPage">
            {showBookInfor && (
                <div className="searchPage__overlay" onClick={() => setShowBookInfor(false)}>
                    <BookInfor book={selectedBook} />
                </div>
            )}
            <h2 className="searchPage__title">Kết quả tìm kiếm cho: "{query}"</h2>
            {loading ? (
                <p>Đang tải...</p>
            ) : books.length === 0 ? (
                <p>Không tìm thấy kết quả nào</p>
            ) : (
                <>
                    <div className={`searchPage__list ${animationClass}`}>
                        {displayBooks.map(book => (
                            <div
                                className="searchPage__card"
                                key={book._id}
                                onClick={() => {
                                    setShowBookInfor(true);
                                    setSelectedBook(book);
                                }}
                            >
                                <img src={`${getApiUrl()}${book.image}`} alt={book.title} />
                                <div className="searchPage__info">
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                    <p>{book.price.toLocaleString('vi-VN')} đ</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="searchPage__pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    className={`searchPage__page-button ${currentPage === i + 1 ? "active" : ""}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchPage;
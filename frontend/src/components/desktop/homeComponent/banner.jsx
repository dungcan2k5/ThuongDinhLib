import React, { useEffect, useState } from "react";
import GetBook from "../../../services/GetBook";
import './banner.css';
import BookInfor from "../BookInfor/BookInfor";
import { getApiUrl } from "../../../utils/apiUtils";

const Banner = () => {
    const [books, setBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const [showBookInfor, setShowBookInfor] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)

    const bannerClick = (book) => {
        setSelectedBook(book)
        setShowBookInfor(true)
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const allBooks = await GetBook();
                setBooks(allBooks.slice(0, 5)); // Giả sử chỉ hiển thị 5 cuốn sắp ra mắt
            } catch (error) {
                console.error("Lỗi khi lấy sách:", error);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        if (books.length === 0) return;

        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
                setFade(false);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [books]);

    if (books.length === 0) {
        return <p>Đang tải sách...</p>;
    }

    const currentBook = books[currentIndex];

    return (
        <div className="upComing">
            {showBookInfor && (
                <div className="banner__overlay" onClick={() => setShowBookInfor(false)}>
                    <BookInfor book={selectedBook}/>
                </div>
            )}
            <h2>Sách mới</h2>
            <div className={`banner ${fade ? "fade-out" : ""}`} onClick={() => bannerClick(currentBook)}>
                <div className="banner_des">
                    <h2>{currentBook.title}</h2>
                    <h3>{currentBook.author}</h3>
                    <div className="Cross"></div>
                    <p>{currentBook.description}</p>
                </div>
                <div className="banner_img">
                    <img src={`${getApiUrl()}${currentBook.image}`} alt={currentBook.title} />
                </div>
            </div>
        </div>
    );
};

export default Banner;
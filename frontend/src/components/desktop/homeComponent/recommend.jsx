import React, { useEffect, useState } from "react";
import GetBook from "../../../services/GetBook";
import './recommend.css';
import BookInfor from "../BookInfor/BookInfor";
import { getApiUrl } from "../../../utils/apiUtils";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';

const Recommend = () => {
    const [books, setBooks] = useState([]);
    const [showBookInfor, setShowBookInfor] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const recommendClick = (book) => {
        setSelectedBook(book);
        setShowBookInfor(true);
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const allBooks = await GetBook();
                setBooks(allBooks.slice(-5));
            } catch (error) {
                console.error("Lỗi khi lấy sách:", error);
            }
        };

        fetchBooks();
    }, []);

    if (books.length === 0) {
        return <p>Đang tải sách...</p>;
    }

    return (
        <div className="upComing">
            {showBookInfor && selectedBook && (
                <div className="recommend__overlay" onClick={() => setShowBookInfor(false)}>
                    <BookInfor book={selectedBook} />
                </div>
            )}

            <h2 className="recommend__title">Gợi ý cho bạn</h2>

            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="recommend-swiper"
            >
                {books.map((book, index) => (
                    <SwiperSlide key={index}>
                        <div className="recommend" onClick={() => recommendClick(book)}>
                            <div className="recommend_des">
                                <h2>{book.title}</h2>
                                <h3>{book.author}</h3>
                                <div className="recommend__cross"></div>
                                <p>{book.description}</p>
                            </div>
                            <div className="recommend_img">
                                <img src={`${getApiUrl()}${book.image}`} alt={book.title} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Recommend;
import React, { useState, useEffect } from "react";
import "../PopularMobile/PopularMobile.css";
import BookCard from "../BookPages/BookCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getApiUrl } from "../../../utils/apiUtils.js";
const RecommendMobile = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${getApiUrl()}/api/books`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        return res.json();
      })
      .then((data) => {
        const updatedBooks = data.map((book) => ({
          ...book,
          price: book.price.$numberDecimal
            ? parseFloat(book.price.$numberDecimal)
            : book.price,
        }));
        setBooks(updatedBooks);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div className="popular-mobile">
      <h2>Đề xuất cho bạn</h2>
      {books.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          style={{ paddingBottom: "30px" }}
        >
          {books.slice(4, 10).map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Không có sách trong thể loại này.</p>
      )}
    </div>
  );
};

export default RecommendMobile;

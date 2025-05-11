import React, { useState, useEffect } from "react";
import "../PopularMobile/PopularMobile.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getImgUrl } from "../../../utils/getImgUrl";

const RecommendMobile = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/books")
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
        // Bắt lỗi và xử lý nếu có lỗi
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div className="popular-mobile">
      <h2>Đề xuất cho bạn</h2>
      {/* Hiển thị book-card bằng Swiper */}
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
              <div className="book-card">
                <div className="book-card_container">
                  <div className="book-image">
                    <img src={`${getImgUrl(book?.image)}`} alt={book.title} />
                  </div>
                  <div className="book-details__gap">
                    <div className="book-details">
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <div className="book-price">{book.price}₫</div>
                      <div className="book-actions">
                        <button className="add-to-cart">Mượn</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

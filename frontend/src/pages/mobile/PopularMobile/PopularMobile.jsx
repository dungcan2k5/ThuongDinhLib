import React, { useState, useEffect } from "react";
import "./PopularMobile.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getImgUrl } from "../../../utils/getImgUrl";

const PopularMobile = () => {
  const categories = ["Thể loại", "Văn học Việt Nam", "Văn học nước ngoài"];

  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Thể loại");

  useEffect(() => {
    fetch("books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filterBooks =
    selectedCategory === "Thể loại"
      ? books
      : books.filter(
          (book) =>
            book.category?.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );

  return (
    <div className="popular-mobile">
      <h2>Phổ biến</h2>

      <div className="genre-select">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          id="genre"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị book-card bằng Swiper */}
      {filterBooks.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          style={{ paddingBottom: "30px" }}
        >
          {filterBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <div className="book-card">
                <div className="book-card_container">
                  <div className="book-image">
                    <img src={`${getImgUrl(book.image)}`} alt={book.title} />
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

export default PopularMobile;

import React, { useState, useEffect } from "react";
import "./PopularMobile.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BookCard from "../BookPages/BookCard";
const PopularMobile = () => {
  const categories = ["Thể loại", "Văn học Việt Nam", "Văn học nước ngoài"];

  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Thể loại");

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

export default PopularMobile;

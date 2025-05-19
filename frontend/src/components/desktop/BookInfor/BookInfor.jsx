import React, { useEffect, useState } from "react";
import { getApiUrl } from "../../../utils/apiUtils";
import "./BookInfor.css";
import loginCheck from "../../../utils/loginCheck";
import LoginAlertPopup from "../../../utils/loginAlertPopup";
import getUserIdFromToken from "../../../../../backend/utils/decodeId";
import Swal from "sweetalert2";
const BookInfor = ({ book }) => {
  const [popUpAlert, setPopUpAlert] = useState(false);
  const [logined, setLogined] = useState(true);

  useEffect(() => {
    if (!loginCheck()) {
      setLogined(false);
    }
  }, []);

  const borrowBook = (book) => {
    if (!logined) {
      setPopUpAlert(true);
    } else {
      addToCart(book);
      Swal.fire({
        title: "Sách đã được thêm vào giỏ hàng!",
        icon: "success",
        draggable: true,
      });
    }
  };

  const addToCart = (book) => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    const cartKey = `cart_${userId}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingIndex = cart.findIndex((item) => item._id === book._id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
  };

  if (!book) return null;
  const {
    title,
    publishYear,
    description,
    author,
    category,
    image,
    price,
    isbn,
  } = book;
  return (
    <div className="bookInfor" onClick={(e) => e.stopPropagation()}>
      {popUpAlert && <LoginAlertPopup onClose={() => setPopUpAlert(false)} />}
      <div className="bookInfor__img">
        <img src={`${getApiUrl()}${image}`} alt="" />
      </div>
      <div className="bookInfor__des">
        <h2 className="bookInfor__title">{title}</h2>
        <div className="bookInfor__isbn">{isbn}</div>
        <div className="Cross"></div>
        <div className="bookInfor__category">Thể loại: {category}</div>
        <div className="bookInfor__author">Tác giả: {author}</div>
        <div className="bookInfor__publishYear">
          Năm xuất bản: {publishYear}
        </div>
        <div className="Cross"></div>
        <div className="bookInfor__price">
          {(() => {
            const value =
              typeof price === "object" && price.$numberDecimal
                ? Number(price.$numberDecimal)
                : typeof price === "number"
                ? price
                : null;

            return value !== null
              ? `${value.toLocaleString("vi-VN")}đ`
              : "Không rõ giá";
          })()}
        </div>
        <p className="bookInfor__description">{description}</p>
        <button className="bookInfor__borrow" onClick={() => borrowBook(book)}>
          Mượn sách
        </button>
      </div>
    </div>
  );
};

export default BookInfor;

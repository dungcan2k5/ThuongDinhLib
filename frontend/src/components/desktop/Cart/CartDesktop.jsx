import React, { use } from "react";
import getUserIdFromToken from "../../../../../backend/utils/decodeId";
import { useState, useEffect, useRef } from "react";
import { getApiUrl } from "../../../utils/apiUtils";
import { FaTimes } from "react-icons/fa";
import './CartDesktop.css'
import Record from "../record";

const getCartForCurrentUser = () => {
    const userId = getUserIdFromToken();
    if (!userId) return [];
    const cartKey = `cart_${userId}`;
    return JSON.parse(localStorage.getItem(cartKey)) || [];
  };

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const total = cartItems.reduce((sum, item) => sum + Number(item.price.$numberDecimal), 0);
  const [recordShow, setRecordShow] = useState(false)

    useEffect(() => {
        const items = getCartForCurrentUser();
        setCartItems(items);
    }, []);

    if (cartItems.length === 0) {
        return <p className="cart__empty">Giỏ hàng của bạn đang trống.</p>;
    }

    const removeFromCart = (indexToRemove) => {
      const userId = getUserIdFromToken();
      const cartKey = `cart_${userId}`;
      const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);

      setCartItems(updatedCart); // cập nhật UI
      localStorage.setItem(cartKey, JSON.stringify(updatedCart)); // cập nhật localStorage
    };

    const afterBorrow = () => {
      const userId = getUserIdFromToken(); // lấy lại userId
      const cartKey = `cart_${userId}`;
      localStorage.removeItem(cartKey);    // xoá localStorage
      setCartItems([]);     
    }

    return (
            <div className="cart">
                <div className="cart__title">
                  <h2>Giỏ hàng của bạn</h2>
                </div>
                <div className="cart__form">
                  <div className="cart__list">
                    {cartItems.map((book, index) => (
                        <div key={index} className="cart__item">
                            <div className="cart__item-img">
                              <img src={`${getApiUrl()}${book.image}`} alt={book.title} width="100" />
                            </div>
                            <div className="card__item-content">
                                <h3>{book.title}</h3>
                                <p className="cart__item-author">Tác giả: {book.author}</p>
                                <p className="cart__item-price">Giá: {Number(book.price.$numberDecimal).toLocaleString("vi-VN")}đ</p>
                            </div>
                            <FaTimes className="cart__item-del" onClick={() => removeFromCart(index)}/>
                        </div>
                    ))}
                  </div>
                  <div className="cart_pay">
                    <div className="cart__total">Tổng thành tiền: {total.toLocaleString("vi-VN")}đ</div>
                    <div className="cart_method">
                        <button className="cart__bookBorrow" onClick={() => {setRecordShow(true)}}>Mượn sách</button>
                    </div>
                  </div>
                </div>
                {recordShow && <Record book={cartItems} onCLose={() => {setRecordShow(false); afterBorrow();}}/>}
            </div>
        );

}

export default Cart
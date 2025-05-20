import React, { useState, useEffect } from "react";
import getUserIdFromToken from "../../../../../backend/utils/decodeId";
import { getApiUrl } from "../../../utils/apiUtils";
import { FaTimes } from "react-icons/fa";
import './Cart.css';
import Record from "../record/record";

const getCartForCurrentUser = () => {
    const userId = getUserIdFromToken();
    if (!userId) return [];
    const cartKey = `cart_${userId}`;
    return JSON.parse(localStorage.getItem(cartKey)) || [];
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [recordShow, setRecordShow] = useState(false);

    useEffect(() => {
        const items = getCartForCurrentUser();
        setCartItems(items);
    }, []);

    const updateCartStorage = (updatedCart) => {
        const userId = getUserIdFromToken();
        const cartKey = `cart_${userId}`;
        setCartItems(updatedCart);
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    };

    const removeFromCart = (indexToRemove) => {
        const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
        updateCartStorage(updatedCart);
    };

    const handleQuantityChange = (index, change) => {
        const updatedCart = [...cartItems];
        const currentQty = updatedCart[index].quantity || 1;
        const newQty = currentQty + change;
        if (newQty < 1) return;
        updatedCart[index].quantity = newQty;
        updateCartStorage(updatedCart);
    };

    const afterBorrow = () => {
        const userId = getUserIdFromToken();
        const cartKey = `cart_${userId}`;
        localStorage.removeItem(cartKey);
        setCartItems([]);
    };

    const total = cartItems.reduce((sum, item) => {
        const price = typeof item.price === "object"
            ? Number(item.price?.$numberDecimal || 0)
            : Number(item.price || 0);
        const quantity = item.quantity || 1;
        return sum + price * quantity;
    }, 0);

    if (cartItems.length === 0) {
        return <p className="cart__empty">Giỏ hàng của bạn đang trống.</p>;
    }

    return (
        <div className="cart">
            <div className="cart__title">
                <h2>Giỏ hàng của bạn</h2>
            </div>
            <div className="cart__form">
                <div className="cart__list">
                    {cartItems.map((book, index) => {
                        const quantity = book.quantity || 1;
                        const price = typeof book.price === "object"
                            ? Number(book.price?.$numberDecimal || 0)
                            : Number(book.price || 0);
                        const totalItemPrice = price * quantity;

                        return (
                            <div key={index} className="cart__item">
                                <div className="cart__item-img">
                                    <img src={`${getApiUrl()}${book.image}`} alt={book.title} width="100" />
                                </div>
                                <div className="card__item-content">
                                    <h3>{book.title}</h3>
                                    <p className="cart__item-author">Tác giả: {book.author}</p>
                                    <div className="cart__item-quantity">
                                        <span>Số lượng: </span>
                                        <button onClick={() => handleQuantityChange(index, -1)} className="qty--btn">−</button>
                                        <span className="qty--number">{quantity}</span>
                                        <button onClick={() => handleQuantityChange(index, 1)} className="qty--btn">+</button>
                                    </div>
                                    <p className="cart__item-price">
                                        Giá: {totalItemPrice.toLocaleString("vi-VN")}đ
                                    </p>
                                </div>
                                <FaTimes className="cart__item-del" onClick={() => removeFromCart(index)} />
                            </div>
                        );
                    })}
                </div>
                <div className="cart_pay">
                    <div className="cart__total">
                        Tổng thành tiền: {total.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="cart_method">
                        <button
                            className="cart__bookBorrow"
                            onClick={() => setRecordShow(true)}
                        >
                            Thanh Toán
                        </button>
                    </div>
                </div>
            </div>

            {recordShow && (
                <Record
                    book={cartItems}
                    onCLose={() => setRecordShow(false)}
                    onBorrowSuccess={() => {
                        afterBorrow();        
                        setRecordShow(false);
                    }}
                />
            )}
        </div>
    );
};

export default Cart;
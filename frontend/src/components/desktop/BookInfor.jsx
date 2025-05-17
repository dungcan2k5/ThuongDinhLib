import React, { useEffect, useState } from "react";
import { getApiUrl } from "../../utils/apiUtils";
import './BookInfor.css'
import loginCheck from "../../utils/loginCheck";
import LoginAlertPopup from "../../utils/loginAlertPopup";
import getUserIdFromToken from "../../../../backend/utils/decodeId";

const BookInfor = ({book}) => {
    const [popUpAlert, setPopUpAlert] = useState(false)
    const [logined, setLogined] = useState(true)

    useEffect(() => {
        // localStorage.removeItem("token");
        if (!loginCheck()) {
            setLogined(false)
        }    
    }, [])

    const borrowBook = (book) => {
        if (!logined) {
            setPopUpAlert(true)
        }
        else {
            addToCart(book)
            alert('Sách đã được thêm vào giỏ hàng')
        }
    }

    const addToCart = (book) => {
        const userId = getUserIdFromToken();
        if (!userId) return;

        const cartKey = `cart_${userId}`;
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const alreadyExists = cart.some(item => item._id === book._id);
        if (!alreadyExists) {
            cart.push(book);
            localStorage.setItem(cartKey, JSON.stringify(cart));
        }
    };


    if (!book) return null;
    const {title, publishYear, description, author, category, image, price, isbn} = book
    return (
        <div className="bookInfor" onClick={(e) => e.stopPropagation()} >
            {popUpAlert && (
                <LoginAlertPopup onClose={() => setPopUpAlert(false)} />
            )}
            <div className="bookInfor__img">
                <img src={`${getApiUrl()}${image}`} alt="" />
            </div>
            <div className="bookInfor__des">
                <h2 className="bookInfor__title">{title}</h2>
                <div className="bookInfor__isbn">{isbn}</div>
                <div className="Cross"></div>
                <div className="bookInfor__category">Thể loại: {category}</div>
                <div className="bookInfor__author">Tác giả: {author}</div>
                <div className="bookInfor__publishYear">Năm xuất bản: {publishYear}</div>
                <div className="Cross"></div>
                <div className="bookInfor__price">{Number(price.$numberDecimal).toLocaleString('vi-VN')}đ</div>
                <p className="bookInfor__description">{description}</p>
                <button className="bookInfor__borrow" onClick={() => borrowBook(book)}>Mượn sách</button>
            </div>
        </div>
    )
}

export default BookInfor
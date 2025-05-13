import React, { useEffect, useState } from "react";
import { getBaseURL } from "../../services/bookService";
import './BookInfor.css'

const BookInfor = ({book}) => {
    if (!book) return;
    const {title, publishYear, description, author, category, image, price, isbn} = book
    return (
        <div className="bookInfor" onClick={(e) => e.stopPropagation()} >
            <div className="bookInfor__img">
                <img src={`${getBaseURL()}${image}`} alt="123123" />
            </div>
            <div className="bookInfor__des">
                <h2 className="bookInfor__title">{title}</h2>
                <p className="bookInfor__description">{description}</p>
                <div className="Cross"></div>
                <div className="bookInfor__category">Thể loại: {category}</div>
                <div className="bookInfor__author">Tác giả: {author}</div>
                <div className="bookInfor__publishYear">Năm xuất bản: {publishYear}</div>
                <div className="Cross"></div>
                <div className="bookInfor__price">{Number(price.$numberDecimal).toLocaleString('vi-VN')}đ</div>
                <div className="bookInfor__isbn">{isbn}</div>
                <button className="bookInfor__borrow">Mượn sách</button>
            </div>
        </div>
    )
}

export default BookInfor
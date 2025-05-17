import { useEffect, useState } from "react"
import React from "react"
import './record.css'

const Record = ({ book, onCLose}) => {
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + 14); // cộng thêm 14 ngày

    const formatDate = (date) =>
    date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    
    const totalPrice = book?.reduce((sum, item) => {
        return sum + Number(item.price?.$numberDecimal || 0);
    }, 0);

  return (
    <div className="Record">
        <div className="Record__overlay" onClick={onCLose}>
            <div className="Record__content">
                <h2>Mượn sách thành công</h2>
                <div className="record__data">
                    {book && book.length > 0 ? (
                    book.map((item, index) => (
                        <div key={index} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }} className="record__item">
                            <div className="record__bookinfor">
                                <h3>{item.title}</h3>
                                <h4>{item.author}</h4>
                                <p><span className="Record__date">Ngày mượn:</span>{formatDate(borrowDate)}</p>
                                <p><span className="Record__date">Đến hạn: </span>{formatDate(dueDate)}</p>
                            </div>
                            <div className="record_price">
                                <p>{Number(item.price?.$numberDecimal || 0).toLocaleString("vi-VN")}đ</p>
                            </div>
                        </div>
                    ))
                    ) : (
                    <p>Không có sách nào để hiển thị.</p>
                    )}
                    <div className="record__total">
                        <p>Tổng tiền: {totalPrice.toLocaleString("vi-VN")}đ</p>
                        <button className="Record__button" onClick={onCLose}>Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Record;
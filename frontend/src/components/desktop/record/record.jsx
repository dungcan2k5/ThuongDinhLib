import { useEffect, useState } from "react";
import React from "react";
import './record.css';
import { getApiUrl } from "../../../utils/apiUtils";
import getUserIdFromToken from "../../../../../backend/utils/decodeId";

const Record = ({ book, onCLose, onBorrowSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + 14);

    const formatDate = (date) =>
        date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

    const totalPrice = book?.reduce((sum, item) => {
        const price = typeof item.price === "object"
            ? Number(item.price?.$numberDecimal ?? 0)
            : Number(item.price ?? 0);
        const quantity = item.quantity || 1;
        return sum + price * quantity;
    }, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = getUserIdFromToken();
        if (!userId) {
            alert("Không thể xác định người dùng.");
            return;
        }

        const order = {
            user: { ...formData },
            books: book.map(item => ({
                title: item.title,
                author: item.author,
                price: typeof item.price === "object"
                    ? Number(item.price?.$numberDecimal ?? 0)
                    : Number(item.price ?? 0),
                quantity: item.quantity || 1
            })),
            total: totalPrice,
            borrowDate: borrowDate.toISOString(),
            dueDate: dueDate.toISOString(),
        };

        const existingOrders = JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
        const updatedOrders = [...existingOrders, order];
        localStorage.setItem(`orders_${userId}`, JSON.stringify(updatedOrders));

        alert("Đơn hàng đã được lưu vào localStorage!");
        onBorrowSuccess();
    };

    return (
        <div className="Record">
            <div className="Record__overlay" onClick={onCLose}>
                <div className="Record__content" onClick={e => e.stopPropagation()}>
                    <h2>Mượn sách thành công</h2>
                    <div className="record__container">
                        <div className="record__data">
                            {book && book.length > 0 ? (
                                book.map((item, index) => (
                                    <div key={index} className="record__item">
                                        <div className="record__img">
                                            <img src={`${getApiUrl()}${item.image}`} alt="" />
                                        </div>
                                        <div className="record__bookinfor">
                                            <h3>{item.title}</h3>
                                            <h4>{item.author}</h4>
                                        </div>
                                        <div className="record__price">
                                            <p>
                                                {
                                                    typeof item.price === "object"
                                                        ? Number(item.price?.$numberDecimal ?? 0).toLocaleString("vi-VN")
                                                        : Number(item.price ?? 0).toLocaleString("vi-VN")
                                                }đ
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Không có sách nào để hiển thị.</p>
                            )}
                            <div className="record__total">
                                <p className="Record__day"><span className="Record__date">Ngày mượn: </span>{formatDate(borrowDate)}</p>
                                <p className="Record__day"><span className="Record__date">Đến hạn: </span>{formatDate(dueDate)}</p>
                                <p><span className="Record__date">Tổng tiền: </span>{totalPrice.toLocaleString("vi-VN")}đ</p>
                            </div>
                        </div>

                        <form className="record__form" onSubmit={handleSubmit}>
                            <h3>Thông tin người mượn</h3>
                            <label>Họ tên:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label>Số điện thoại:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <label>Địa chỉ:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className="Record__button">Xác nhận</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Record;
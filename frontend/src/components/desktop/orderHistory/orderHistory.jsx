import React, { useState, useEffect } from "react";
import getUserIdFromToken from "../../../../../backend/utils/decodeId";
import './OrderHistory.css';

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric"
  });
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) return;
    const storedOrders = JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="orderhistory">
      <h2>Lịch sử đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order, index) => (
            <li key={index} className="orderhistory__item" onClick={() => setSelectedOrder(order)}>
              <div className="orderhistory__des">Đơn hàng {index + 1}</div>
              <div className="orderhistory__des">Ngày mượn: {formatDate(order.borrowDate)}</div>
              <div className="orderhistory__des">Tổng: {order.total.toLocaleString("vi-VN")}đ</div>
            </li>
          ))}
        </ul>
      )}

      {/* Popup chi tiết đơn */}
      {selectedOrder && (
        <div className="order-popup" onClick={() => setSelectedOrder(null)}>
          <div className="order-popup-content" onClick={e => e.stopPropagation()}>
            <div className="order__data">
              <p className="order__data-item"><span>Họ tên:</span> {selectedOrder.user.name}</p>
              <p className="order__data-item"><span>Email:</span> {selectedOrder.user.email}</p>
              <p className="order__data-item"><span>SĐT:</span> {selectedOrder.user.phone}</p>
              <p className="order__data-item"><span>Địa chỉ:</span> {selectedOrder.user.address}</p>
              <p className="order__data-item"><span>Ngày mượn:</span> {formatDate(selectedOrder.borrowDate)}</p>
              <p className="order__data-item"><span>Hạn trả:</span> {formatDate(selectedOrder.dueDate)}</p>
            </div>

            <div className="order__book-data">
              <h2>Sách mượn:</h2>
              <ul className="order__book-list">
                {selectedOrder.books.map((book, i) => {
                  const quantity = book.quantity || 1;
                  const totalPrice = book.price * quantity;

                  return (
                    <li key={i}>
                      {book.title} - {book.author} | SL: {quantity} | 
                      Giá: {book.price.toLocaleString("vi-VN")}đ | 
                      Thành tiền: {totalPrice.toLocaleString("vi-VN")}đ
                    </li>
                  );
                })}
              </ul>
              <p><strong>Tổng tiền:</strong> {selectedOrder.total.toLocaleString("vi-VN")}đ</p>
            </div>

            <button onClick={() => setSelectedOrder(null)} className="order__button">Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
import React from "react";
import './LoginAlertPopup.css';

const LoginAlertPopup = ({ onClose }) => {
  return (
    <div className="loginAlert__popup-overlay">
      <div className="loginAlert__popup">
        <p>Bạn cần đăng nhập để mượn sách</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default LoginAlertPopup
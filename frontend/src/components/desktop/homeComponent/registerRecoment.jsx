import React, { useEffect, useState } from "react";
import './registerRecoment.css'
import { Link } from 'react-router-dom'
const RegisterRecoment = () => {
    return (
        <div className="registerRecoment">
            <div className="registerRecoment__title">
                <h2>Đăng kí ngay hôm nay để trở thành thành viên</h2>
            </div>
            <div className="registerRecoment__content">
                <p>Trở thành thành viên để nhận nhiều ưu đãi,<br/> mượn sách nhanh chóng và cập nhật những tựa sách mới nhất!</p>
            </div>
            <div className="registerRecoment__link">
                <Link to="/register">
                    <button className="registerRecoment__button">Đăng kí miễn phí tại đây</button>
                </Link>
            </div>
        </div>
    )
}

export default RegisterRecoment
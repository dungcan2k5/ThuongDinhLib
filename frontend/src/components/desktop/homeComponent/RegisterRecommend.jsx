import React, { useEffect, useState } from "react";
import './RegisterRecommend.css'
import { Link } from 'react-router-dom'
const RegisterRecommend = () => {
    return (
        <div className="registerRecommend">
            <div className="registerRecommend__title">
                <h2>Đăng kí ngay hôm nay để trở thành thành viên</h2>
            </div>
            <div className="registerRecommend__content">
                <p>Trở thành thành viên để nhận nhiều ưu đãi,<br/> mượn sách nhanh chóng và cập nhật những tựa sách mới nhất!</p>
            </div>
            <div className="registerRecommend__link">
                <Link to="/register">
                    <button className="registerRecommend__button">Đăng kí miễn phí tại đây</button>
                </Link>
            </div>
        </div>
    )
}

export default RegisterRecommend
import React, { useEffect, useState } from "react";
import './FooterDesktop.css'
import { FaFacebookF, FaInstagram, FaGoogle } from 'react-icons/fa';

const FooterDesktop = () => {
    return (
        <div className="footer">
            <div className="footer__title">
                <h2>Thư Viện Thượng Đình</h2>
            </div>
            <div className="footer__contact">
                <p><span>Địa chỉ: </span>123 Nguyễn Trãi, Thượng Đình, TP. Hồ Chí Minh, Việt Nam</p>
                <p><span>Liên hệ: </span>0353267883 - 0353229224</p>
                <p><span>Email: </span>thuongdinhlib@gmail.com</p>
            </div>
            <div className="footer__media">
                <ul className="footer__media-list">
                    <li className="footer__media-item"><FaFacebookF/></li>
                    <li className="footer__media-item"><FaGoogle/></li>
                    <li className="footer__media-item"><FaInstagram/></li>
                </ul>
            </div>
        </div>
    )
}

export default FooterDesktop
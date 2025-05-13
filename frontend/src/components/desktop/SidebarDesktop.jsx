import React from "react";
import { FaHome, FaUser, FaShoppingCart } from "react-icons/fa";
import './SideBarDesktop.css'


const SlideBar = () => {
    return (
        <div className="sideBar">
            <ul className="sideBar__list">
                <li className="sideBar__item"><FaHome className="SideBar__Home-icon"/>Home</li>
                <li className="sideBar__item"><FaShoppingCart className="SideBar__Cart-icon"/>Giỏ hàng</li>
                <li className="sideBar__item"><FaUser className="SideBar__Account-icon"/>Tài khoản</li>
            </ul>
        </div>
    )
}

export default SlideBar;
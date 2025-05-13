import React, { useState } from "react";
import { FaHome, FaUser, FaShoppingCart, FaThList } from "react-icons/fa";
import './SideBarDesktop.css'

const SlideBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div 
            className={`sideBar ${isExpanded || isHovered ? 'expanded' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ul className="sideBar__list">
                <li className="sideBar__item" onClick={toggleSidebar}>
                    <FaThList className="SideBar__Toggle-icon" />
                    <span className="sideBar__text">{(isExpanded || isHovered) && 'Thu gọn'}</span>
                </li>
                <li className="sideBar__item">
                    <FaHome className="SideBar__Home-icon"/>
                    <span className="sideBar__text">{(isExpanded || isHovered) && 'Home'}</span>
                </li>
                <li className="sideBar__item">
                    <FaShoppingCart className="SideBar__Cart-icon"/>
                    <span className="sideBar__text">{(isExpanded || isHovered) && 'Giỏ hàng'}</span>
                </li>
                <li className="sideBar__item">
                    <FaUser className="SideBar__Account-icon"/>
                    <span className="sideBar__text">{(isExpanded || isHovered) && 'Tài khoản'}</span>
                </li>
            </ul>
        </div>
    )
}

export default SlideBar;
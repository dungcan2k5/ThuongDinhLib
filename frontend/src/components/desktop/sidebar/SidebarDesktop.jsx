import React, { useState } from "react";
import { FaHome, FaUser, FaShoppingCart, FaThList } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaHistory } from "react-icons/fa";
import './SideBarDesktop.css'

const SlideBar = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    //
    const toDashboard = () => {
        navigate('/dashboard')
    }    //

    const toHome = () => {
        navigate('/')
    }    //

    const toCart = () => {
        navigate('/cart')
    }    //
    const toOrderHistory = () => {
        navigate('/history')
    }    //
    return (
        <div 
            className={`sideBar ${isExpanded || isHovered ? 'expanded' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ul className="sideBar__list">
                <li className="sideBar__item" onClick={toggleSidebar}>
                    <FaThList className="SideBar__Toggle-icon" />
                    <span className="sideBar__text">{(isExpanded || isHovered) && 'Ghim Sidebar'}</span>
                </li>
                <li className="sideBar__item"  onClick={() => toHome()}>
                    <FaHome className="SideBar__Home-icon"/>
                    <span className="sideBar__text">{(isExpanded || isHovered) && 'Home'}</span>
                </li>
                <li className="sideBar__item" onClick={() => toCart()}>
                    <FaShoppingCart className="SideBar__Cart-icon"/>
                    <span className="sideBar__text">{(isExpanded || isHovered) && 'Giỏ hàng'}</span>
                </li>
                <li className="sideBar__item" onClick={() => toOrderHistory()}>
                    <FaHistory className="SideBar__Account-icon"/>
                    <span className="sideBar__text">{(isExpanded || isHovered) && 'Đơn mua'}</span>
                </li>
                <li className="sideBar__item" onClick={() => toDashboard()}>
                    <FaUser className="SideBar__Account-icon"/>
                    <span className="sideBar__text">{(isExpanded || isHovered) && 'Tài khoản'}</span>
                </li>
            </ul>
        </div>
    )
}

export default SlideBar;
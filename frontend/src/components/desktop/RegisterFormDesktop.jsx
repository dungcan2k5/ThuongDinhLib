import React from 'react'
import './RegisterFormDesktop.css'
import logo from '../../assets/logo/logo_trang.png'
import { Link } from 'react-router-dom'

const RegisterFormDesktop = () => {
  return (
      <div className="register">
        <div className="register__left">
          <h2 className="register__title">Đăng kí tài khoản</h2>
          <p className="register__des">Thư viện sách Thượng Đình</p>
          <form action="" className="register__form">
            <input type="text" className="register__input" placeholder='Tên người dùng'/>
            <input type="password" className="register__input" placeholder='Mật khẩu'/>
            <input type="password" className="register__input" placeholder='Xác nhận mật khẩu'/>
            <input type="text" className="register__input" placeholder='Email'/>
            <input type="text" className="register__input" placeholder='Số điện thoại'/>
            <div className="register__feature">
              <button className="register__confirm">Đăng kí</button>
              <p className="register__forgot">Đã có tài khoản?<Link to={'/login'} className="register__forgot">Đăng nhập ngay</Link></p>
            </div>
          </form>
        </div>
        <div className="register__right">
          <img src={logo} alt="" className='register__logo'/>
        </div>
      </div>
  )
}

export default RegisterFormDesktop
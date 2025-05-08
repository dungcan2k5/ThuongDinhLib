import React from 'react'
import './LoginFormDesktop.css'
import logo from '../../assets/logo/logo_trang.png';

const LoginFormDesktop = () => {
  return (
      <div className="login">
        <div className="login__right">
          <img src={logo} alt="" className='login__logo' />
        </div>
        <div className="login__left">
          <h2 className="login__title">Đăng Nhập</h2>
          <p className="login__des">Thư viện sách Thượng Đình</p>
          <form action="" className="login__form">
            <input type="text" className="login__input" placeholder='Tài khoản'/>
            <input type="password" className="login__input" placeholder='Mật khẩu'/>
            <div className="login__feature">
              <button className="login__confirm">Đăng nhập</button>
              <p className="login__forgot">Chưa có tài khoản?<a href="" className="login__forgot">Đăng ký ngay</a></p>
            </div>
          </form>
        </div>
      </div>
  )
}

export default LoginFormDesktop
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginFormDesktop.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/logo_trang.png'

const LoginFormDesktop = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [passwordMessage, setPasswordMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setPasswordMessage('')
    setEmailMessage('')
    setMessage('')

    let flag = false

    if (!password) {
      setPasswordMessage('Vui lòng nhập mật khẩu')
      flag = true
    }

    if (!email) {
      setEmailMessage('Vui lòng nhập email')
      flag = true
    }

    if (!flag) {
      try {
      const res = await fetch('http://localhost:5000/api/customers/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password})
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Đăng nhập thành công');
        navigate('/');
        return;
      }
      else {
        setMessage(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
        console.error('Lỗi kết nối:', error);
        setMessage('Không thể kết nối tới máy chủ');
    }
    }
  };





  return (
      <div className="login">
        <div className="login__left">
          <h2 className="login__title">Đăng Nhập</h2>
          <p className="login__des">Thư viện sách Thượng Đình</p>
          <form onSubmit={handleLogin} className="login__form">
            <input type="text" className="login__input" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <p className="login__error">{emailMessage}</p>
            <input type="password" className="login__input" placeholder='Mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p className="login__error">{passwordMessage}</p>
            <div className="login__feature">
              <button type='submit' className="login__confirm">Đăng nhập</button>
              <p className="login__abort">{message}</p>
              <p className="login__forgot">Chưa có tài khoản?<Link to="/register" className="login__forgot">Đăng ký ngay</Link></p>
            </div>
          </form>
        </div>
        <div className="login__right">
          <img src={logo} alt="" className='login__logo' />
        </div>
      </div>
  )
}

export default LoginFormDesktop
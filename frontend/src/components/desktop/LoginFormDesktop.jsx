import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginFormDesktop.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/logo_trang.png'
import useValidator from '../../hooks/useValidator'
import login from '../../services/loginService'


const LoginFormDesktop = () => {
  const navigate = useNavigate();
  const[message, setMessage] = useState('')
  const useValidatorOption = {
    rules: [
      useValidator.isEmail('[name="email"]'),
      useValidator.minLength('[name="password"]', 6)
    ],
    onSubmit: async (values) => {
      setMessage('')
      const {email, password} = values;
      try {
        const result = await login(email, password);
        if (result.status === 'success') {
          console.log(result.status)
          localStorage.setItem('token', result.token);
          localStorage.setItem('id', result.id)
          navigate('/');
        } else {
          setMessage(result.message || "Tên đăng nhập hoặc mật khẩu sai");
        }
      } catch (error) {
        setMessage(error.message || "Đã xảy ra lỗi khi đăng nhập");
      }
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useValidator(useValidatorOption)

  return (
      <div className="login">
        <div className="login__left">
          <h2 className="login__title">Đăng Nhập</h2>
          <p className="login__des">Thư viện sách Thượng Đình</p>
          <form onSubmit={handleSubmit} className="login__form">
            <input type="text"
              className="login__input" 
              placeholder='Email'
              name='email'
              value={values.email || ''} 
              onChange={handleChange}
            />
            <p className="login__error">{errors.email}</p>

            <input 
              type="password" 
              className="login__input"
              placeholder='Mật khẩu' 
              value={values.password || ''} 
              onChange={handleChange}
              name='password'
            />
            <p className="login__error">{errors.password}</p>

            <div className="login__feature">
              <button type='submit' className="login__confirm">Đăng nhập</button>
              <p className='login__abort'>{message}</p>
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
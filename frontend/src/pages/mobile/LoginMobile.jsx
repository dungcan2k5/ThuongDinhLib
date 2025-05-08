import React from 'react';
import useValidator from '../../hooks/useValidator';
import './LoginMobile.css'
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const validatorOptions = {
    rules: [
      useValidator.isEmail('[name="email"]'),
      useValidator.minLength('[name="password"]', 6)
    ],
    onSubmit: (data) => {
      console.log('Login data:', data);
      // Gọi API đăng nhập ở đây
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useValidator(validatorOptions);

  return (
    <form id="login--form" onSubmit={handleSubmit} className="loginForm">
      <h3 className="loginForm__heading">Đăng nhập</h3>

      <div className="login__container">
        <div className="loginForm__group">
          <label htmlFor="email" className="loginForm__group__label">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email@domain.com"
            className={`loginForm--control ${errors.email ? 'invalid' : ''}`}
            value={values.email || ''}
            onChange={handleChange}
          />
          <span className="loginForm--message">{errors.email}</span>
        </div>

        <div className="loginForm__group">
          <label htmlFor="password" className="loginForm__group__label">Mật khẩu</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mật khẩu"
            className={`loginForm--control ${errors.password ? 'invalid' : ''}`}
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className="loginForm--message">{errors.password}</span>
        </div>

        <div className="loginForm__submit">
          <button type="submit" disabled={isSubmitting}>Đăng nhập</button>
        </div>
        
        <div className ="loginForm__register">
          <p className = "loginForm--register--title">Chưa có tài khoản?</p>
          <Link to = "/register" className = "loginForm__register--link" >Đăng kí</Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
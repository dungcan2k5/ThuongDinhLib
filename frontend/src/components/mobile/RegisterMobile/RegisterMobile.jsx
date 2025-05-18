// components/RegisterForm.js
import React, { useState, useEffect } from "react";
import useValidator from "../../../hooks/useValidator";
import "./RegisterMobile.css";
import { Link } from "react-router-dom";
import register from "../../../services/registerService";
const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [membershipDate, setMembershipDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [cPass, setCPass] = useState("");

  const useValidatorOptions = {
    rules: [
      useValidator.isRequired(
        '[name="name"]',
        "Vui lòng nhập tên đầy đủ của bạn"
      ),
      useValidator.isEmail('[name="email"]'),
      useValidator.isRequired(
        '[name="phone"]',
        "Vui lòng nhập số điện thoại của bạn"
      ),
      useValidator.isPhone('[name="phone"]'),
      useValidator.isRequired(
        '[name="address"]',
        "Vui lòng nhập địa chỉ của bạn"
      ),
      useValidator.minLength('[name="password"]', 6),
      useValidator.isRequired('[name="password__confirmation"]'),
      useValidator.isConfirmed(
        '[name="password__confirmation"]',
        () =>
          document.querySelector('#register--form [name="password"]')?.value,
        "Mật khẩu nhập lại không chính xác"
      ),
    ],

    onSubmit: async (values) => {
      setCPass("");
      if (values.password != values.password__confirmation) {
        setCPass("Mật khẩu xác nhận không trùng khớp");
        return;
      }
      setSuccessMessage("");
      setMessage("");
      const { email, password, address, phone, name } = values;
      try {
        const result = await register(
          name,
          email,
          password,
          phone,
          address,
          membershipDate
        );

        if (result._id) {
          setSuccessMessage("Tài khoản đã được tạo thành công");
        } else {
          setMessage("Đăng ký không thành công");
        }
      } catch (error) {
        setMessage(error.message || "Có lỗi xảy ra, vui lòng thử lại");
      }
    },
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useValidator(useValidatorOptions);

  return (
    <div className="register__mobile">
      <div className="register__container">
        <form
          id="register--form"
          onSubmit={handleSubmit}
          className="registerForm"
        >
          <h3 className="registerForm__heading">Đăng ký</h3>

          <div className="register__container">
            <div className="registerForm__group">
              <label htmlFor="fullname" className="registerForm__group__label">
                Họ và tên
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nguyen Van A"
                className={`registerForm--control ${
                  errors.name ? "invalid" : ""
                }`}
                value={values.name || ""}
                onChange={handleChange}
              />
              <span className="registerForm--message">{errors.name}</span>
            </div>

            <div className="registerForm__group">
              <label htmlFor="email" className="registerForm__group__label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email@domain.com"
                className={`registerForm--control ${
                  errors.email ? "invalid" : ""
                }`}
                value={values.email || ""}
                onChange={handleChange}
              />
              <span className="registerForm--message">{errors.email}</span>
            </div>

            <div className="registerForm__group">
              <label htmlFor="phone" className="registerForm__group__label">
                Số điện thoại
              </label>
              <input
                id="phone"
                name="phone"
                type="number"
                placeholder="Số điện thoại"
                className={`registerForm--control ${
                  errors.phone ? "invalid" : ""
                }`}
                value={values.phone || ""}
                onChange={handleChange}
              />
              <span className="registerForm--message">{errors.phone}</span>
            </div>

            <div className="registerForm__group">
              <label htmlFor="address" className="registerForm__group__label">
                Địa chỉ
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Địa chỉ"
                className={`registerForm--control ${
                  errors.address ? "invalid" : ""
                }`}
                value={values.address || ""}
                onChange={handleChange}
              />
              <span className="registerForm--message">{errors.address}</span>
            </div>

            <div className="registerForm__group">
              <label htmlFor="password" className="registerForm__group__label">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Mật khẩu"
                className={`registerForm--control ${
                  errors.password ? "invalid" : ""
                }`}
                value={values.password || ""}
                onChange={handleChange}
              />
              <span className="registerForm--message">{errors.password}</span>
            </div>

            <div className="registerForm__group">
              <label
                htmlFor="password__confirmation"
                className="registerForm__group__label"
              >
                Nhập lại mật khẩu
              </label>
              <input
                id="password__confirmation"
                name="password__confirmation"
                placeholder="Nhập lại mật khẩu"
                type="password"
                className={`registerForm--control ${
                  errors.password__confirmation ? "invalid" : ""
                }`}
                value={values.password__confirmation || ""}
                onChange={handleChange}
              />
              <span className="registerForm--message">
                {errors.password__confirmation}
              </span>
            </div>

            <div className="registerForm__submit">
              <button type="submit" disabled={isSubmitting}>
                Đăng ký
              </button>
            </div>

            <div className="register__notify">
              <p className="register--success">{successMessage}</p>
              <p className="register--fail">{message}</p>
            </div>

            <div className="registerForm__login">
              <p className="registerForm--login--title">Đã có tài khoản</p>
              <Link to="/login" className="registerForm__login--link">
                Đăng nhập
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

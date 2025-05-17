import { useState } from "react";
import useValidator from "../../../hooks/useValidator";
import "./RegisterMobile.css";
import { Link } from "react-router-dom";
import register from "../../../services/registerService";

const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [membershipDate] = useState(new Date());

  const validatorOptions = {
    rules: [
      useValidator.isRequired(
        '[name="fullname"]',
        "Vui lòng nhập tên đầy đủ của bạn"
      ),
      useValidator.isEmail('[name="email"]'),
      useValidator.isRequired(
        '[name="phone__number"]',
        "Vui lòng nhập số điện thoại của bạn"
      ),
      useValidator.isPhone('[name="phone__number"]'),
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
      setSuccessMessage("");
      setErrorMessage("");

      const { fullname, email, password, phone__number, address } = values;

      try {
        const result = await register(
          fullname,
          email,
          password,
          phone__number,
          address,
          membershipDate
        );

        if (result._id) {
          setSuccessMessage("Tài khoản đã được tạo thành công");
        } else {
          setErrorMessage("Đăng ký không thành công");
        }
      } catch (error) {
        setErrorMessage(error.message || "Có lỗi xảy ra, vui lòng thử lại");
      }
    },
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useValidator(validatorOptions);

  return (
    <div className="register__mobile">
      <div className="register__container">
        <form
          id="register--form"
          onSubmit={handleSubmit}
          className="registerForm"
        >
          <h3 className="registerForm__heading">Đăng ký</h3>

          <div className="registerForm__group">
            <label htmlFor="fullname" className="registerForm__group__label">
              Họ và tên
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Họ và tên"
              className={`registerForm--control ${
                errors.fullname ? "invalid" : ""
              }`}
              value={values.fullname || ""}
              onChange={handleChange}
            />
            <span className="registerForm--message">{errors.fullname}</span>
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
            <label
              htmlFor="phone__number"
              className="registerForm__group__label"
            >
              Số điện thoại
            </label>
            <input
              id="phone__number"
              name="phone__number"
              type="text"
              placeholder="Số điện thoại"
              className={`registerForm--control ${
                errors.phone__number ? "invalid" : ""
              }`}
              value={values.phone__number || ""}
              onChange={handleChange}
            />
            <span className="registerForm--message">
              {errors.phone__number}
            </span>
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

          {successMessage && (
            <p className="registerForm--success">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="registerForm--error">{errorMessage}</p>
          )}

          <div className="registerForm__submit">
            <button type="submit" disabled={isSubmitting}>
              Đăng ký
            </button>
          </div>

          <div className="registerForm__login">
            <p className="registerForm--login--title">Đã có tài khoản</p>
            <Link to="/login" className="registerForm__login--link">
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

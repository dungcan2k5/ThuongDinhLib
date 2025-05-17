import { useNavigate } from "react-router-dom";
import useValidator from "../../../hooks/useValidator";
import "./LoginMobile.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import loginService from "../../../services/loginService";
import { useAuth } from "../../../context/AuthContext";
const LoginForm = () => {
  const { login: authLogin } = useAuth();

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const useValidatorOptions = {
    rules: [
      useValidator.isRequired('[name="email"]', "Vui lòng nhập email"),
      useValidator.isEmail('[name="email"]', "Email không hợp lệ"),
      useValidator.isRequired('[name="password"]', "Vui lòng nhập mật khẩu"),
      useValidator.minLength(
        '[name="password"]',
        6,
        "Mật khẩu tối thiểu 6 ký tự"
      ),
    ],
    onSubmit: async (values) => {
      setMessage("");
      const { email, password } = values;

      try {
        const result = await loginService(email, password);

        if (result.status === "success") {
          localStorage.setItem("token", result.token);
          setMessage("");
          authLogin(result.token);
          navigate("/", { replace: true });
        } else {
          setMessage(result.message || "Thông tin đăng nhập không chính xác");
        }
      } catch (error) {
        console.error("Login error:", error);
        setMessage(
          error.response?.data?.message || "Thông tin đăng nhập không chính xác"
        );
      }
    },
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useValidator(useValidatorOptions);

  return (
    <div className="login__mobile">
      <form id="login--form" onSubmit={handleSubmit} className="loginForm">
        <h3 className="loginForm__heading">Đăng nhập</h3>

        <div className="login__container">
          <div className="loginForm__group">
            <label htmlFor="email" className="loginForm__group__label">
              Email
            </label>
            <input
              name="email"
              type="text"
              placeholder="Email@domain.com"
              className={`loginForm--control ${errors.email ? "invalid" : ""}`}
              value={values.email || ""}
              onChange={handleChange}
            />
            <span className="loginForm--message">{errors.email}</span>
          </div>

          <div className="loginForm__group">
            <label htmlFor="password" className="loginForm__group__label">
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              placeholder="Mật khẩu"
              className={`loginForm--control ${
                errors.password ? "invalid" : ""
              }`}
              value={values.password || ""}
              onChange={handleChange}
            />
            <span className="loginForm--message">{errors.password}</span>
          </div>

          <div className="loginForm__submit">
            <button type="submit" disabled={isSubmitting}>
              Đăng nhập
            </button>
          </div>

          <p className="login__fail">{message}</p>

          <div className="loginForm__register">
            <p className="loginForm--register--title">Chưa có tài khoản?</p>
            <Link to="/register" className="loginForm__register--link">
              Đăng ký
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

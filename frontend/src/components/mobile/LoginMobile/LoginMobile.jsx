import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidator from "../../../hooks/useValidator";
import login from "../../../services/loginService";
import "./LoginMobile.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const validatorOptions = {
    rules: [
      useValidator.isEmail('[name="email"]'),
      useValidator.minLength('[name="password"]', 6),
    ],
    onSubmit: async (data) => {
      setMessage("");
      const { email, password } = data;
      try {
        const result = await login(email, password);
        console.log("API response:", result); // Debug phản hồi API
        if (result.status === "success") {
          localStorage.setItem("token", result.token);
          navigate("/");
        } else {
          setMessage(result.message || "Email hoặc mật khẩu không đúng");
        }
      } catch (error) {
        console.error("Unexpected error:", error); // Debug lỗi bất ngờ
        setMessage("Đã xảy ra lỗi khi đăng nhập");
      }
    },
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useValidator(validatorOptions);

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
              id="email"
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
              id="password"
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
            {message && <p className="loginForm--message">{message}</p>}
          </div>

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

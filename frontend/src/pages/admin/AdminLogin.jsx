import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../utils/apiUtils";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${getApiUrl()}/api/staffs/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ isAdmin: data.isAdmin }));
        navigate("/admin");
      } else {
        setError("Bạn không có quyền truy cập");
      }
    } catch (err) {
      console.error("Lỗi login:", err);
      setError("Có lỗi xảy ra khi đăng nhập");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2 className="admin-login-title">Đăng nhập Admin</h2>
        <div className="admin-login-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin-login-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="admin-login-error">{error}</p>}
        <button type="submit" className="admin-login-button">Đăng nhập</button>
      </form>
    </div>
  );
};

export default AdminLogin;

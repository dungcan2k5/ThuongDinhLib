import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../utils/apiUtils";

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
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Đăng nhập Admin</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px", marginBottom: "12px" }}
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px", marginBottom: "12px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "10px 20px" }}>Đăng nhập</button>
      </form>
    </div>
  );
};

export default AdminLogin;

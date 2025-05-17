import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xoá token và user khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect về trang login admin
    navigate("/admin/login");
  }, [navigate]);

  return null;
};

export default Logout;
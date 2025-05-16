import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  // Chỉ kiểm tra token và user có tồn tại
  if (!token || !userStr) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;

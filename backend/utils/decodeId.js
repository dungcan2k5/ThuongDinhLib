import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return decoded.id;
    } catch {
        return null;
    }
};

export default getUserIdFromToken
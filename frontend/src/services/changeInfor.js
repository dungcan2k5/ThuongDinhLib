
import { getApiUrl } from "../utils/apiUtils";

const changeInfor = async(name, address, phone) => {
    try {
        const baseURL = getApiUrl();
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseURL}/api/customers/profile`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name, address, phone})
        });
        const data = await res.json();
        if (!res.ok) {
            const errorMessage = data.message;
            throw new Error(errorMessage || 'Lỗi');
        }
        return data;
    } catch (error) {
        console.error('Thay đổi thông tin thất bại');
        throw error;
    }
}

export default changeInfor
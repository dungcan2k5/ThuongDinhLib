
import { getApiUrl } from "../utils/apiUtils";

const login = async(email, password) => {
    try {
        const baseURL = getApiUrl();
        const res = await fetch(`${baseURL}/api/customers/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        if (!res.ok) {
            const errorMessage = data.message;
            throw new Error(errorMessage || 'Đăng nhập thất bại');
        }
        return data;
    } catch (error) {
        console.error('Error Login:', error);
        throw error;
    }
}

export default login
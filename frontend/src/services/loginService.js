
import { getBaseURL } from "./bookService";

const login = async(email, password) => {
    try {
        const baseURL = getBaseURL();
        const res = await fetch(`${baseURL}/api/customers/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error('Đăng nhập thất bại');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error Login:', error);
        throw error;
    }
}

export default login
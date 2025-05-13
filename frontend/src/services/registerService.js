
import { getApiUrl } from "../utils/apiUtils";

const register = async(name, email, password, phone, address, membershipDate) => {
    try {
        const baseURL = getApiUrl();
        const res = await fetch(`${baseURL}/api/customers/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password, phone, address, membershipDate})
        });

        const data = await res.json();

        if (!res.ok) {
            const errorMessage = data.message;
            throw new Error(errorMessage || 'Đăng kí không thành công');
        }
        return data;
    }  catch (error) {
        console.error('Error Register:', error);
        throw error;
    }
}

export default register
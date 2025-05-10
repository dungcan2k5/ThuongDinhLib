
import { getBaseURL } from "./bookService";

const register = async(name, email, password, phone, address, membershipDate) => {
    try {
        const baseURL = getBaseURL();
        const res = await fetch(`${baseURL}/api/customers/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password, phone, address, membershipDate})
        });

        if (!res.ok) {
        }
        const data = await res.json();
        return data;
    }  catch (error) {
        console.error('Error Login:', error);
        throw error;
    }
}

export default register
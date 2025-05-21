import { getApiUrl } from "../utils/apiUtils";

/**
 * Change password service
 * @param {string} currentPassword - Current user password
 * @param {string} newPassword - New password to set
 * @returns {Promise} Response from API
 * @throws {Error} When API request fails
 */
const changePassword = async(currentPassword, newPassword) => {
    try {
        const baseURL = getApiUrl();
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseURL}/api/customers/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({currentPassword, newPassword})
        });
        const data = await res.json();
        if (!res.ok) {
            const errorMessage = data.message;
            throw new Error(errorMessage || 'Lỗi');
        }
        return data;
    } catch (error) {
        console.error('Thay đổi mật khẩu thất bại');
        throw error;
    }
}

export default changePassword;
import axios from 'axios';
import { getApiUrl } from "../utils/apiUtils";

const fetchProfile = async (token) => {

  try {
    const baseURL = getApiUrl()
    const response = await axios.get(`${baseURL}/api/customers/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data); // dữ liệu user
    return response
  } catch (error) {
    console.error('Lỗi lấy profile:', error.response?.data?.message);
  }
};

export default fetchProfile
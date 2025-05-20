import { getApiUrl } from '../utils/apiUtils';

const GetBook = async () => {
    try {
        const baseURL = getApiUrl();
        const response = await fetch(`${baseURL}/api/books`)

        if (!response.ok) {
            throw new Error('Network was not ok')
        }

        const data = await response.json();
        return data
    } catch(error) {
        console.error('Error get book!')
        throw error;
    }
}

export default GetBook;
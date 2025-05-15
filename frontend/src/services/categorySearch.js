import { getApiUrl } from '../utils/apiUtils';

const categorySearch = async(category) => {
    try {
        const baseURL = getApiUrl();
        const response = await fetch(`${baseURL}/api/books/search/category?category=${encodeURIComponent(category)}`, {
        });

        if(!response.ok) {
            throw new Error('Lấy sách thất bại')
        }
        const data = await response.json();
        return data
    } catch(error) {
        console.error('Error get book!')
        throw error;
    }
}

export default categorySearch;
import { getApiUrl } from '../utils/apiUtils';

const searchBooks = async (searchTerm) => {
    try {
        const baseURL = getApiUrl();
        const response = await fetch(`${baseURL}/api/books/search/book?q=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
};

export { searchBooks };

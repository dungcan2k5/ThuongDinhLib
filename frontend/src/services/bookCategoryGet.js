import { getBaseURL } from "./bookService";

const getCategory = async () => {
    try {
        const baseURL = getBaseURL();
        const response = await fetch(`${baseURL}/api/books`)

        if (!response.ok) {
            throw new Error('Network was not ok')
        }

        const data = await response.json();
        const category = [...new Set(data.map(book => book.category))]
        return category
    } catch(error) {
        console.error('Error get category!')
        throw error;
    }
}

export default getCategory
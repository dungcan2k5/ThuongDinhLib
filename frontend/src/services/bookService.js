const getBaseURL = () => {
    const { protocol, hostname } = window.location;
    const backendPort = '5001'; // FE chạy ở 3000, BE chạy ở 5000

    return `${protocol}//${hostname}:${backendPort}`;
};

const searchBooks = async (searchTerm) => {
    try {
        const baseURL = getBaseURL();
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

export { searchBooks, getBaseURL };

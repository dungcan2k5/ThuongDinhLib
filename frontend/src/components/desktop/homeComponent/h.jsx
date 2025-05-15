import React, { useEffect, useState } from "react";
import getCategory from "../../../services/bookCategoryGet";
import categorySearch from "../../../services/categorySearch";
import { getApiUrl } from "../../../utils/apiUtils";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BookInfor from "../BookInfor";
import './h.css';

const HDesktop = () => {
    const[categories, setCategories] = useState([]);
    const[books, setBooks] = useState([]);
    const[selectedCategory, setSelectedCategory] = useState('');
    const[currentPage, setCurrentPage] = useState(1);

    const[bookInforState, setBookInforState] = useState(false);
    const[selectedBook, setSelectedBook] = useState('');
    const [fade, setFade] = useState(false);
    const booksPerPage = 6;

    useEffect (() => {
        const fectCategory = async () => {
            const res = await getCategory();
            setCategories(res)

            if (res && res.length > 0) {
                setSelectedCategory(res[0]);
                const booksRes = await categorySearch(res[0]);
                setBooks(booksRes);
            }
        };

        fectCategory();
    }, []);

    const handleCategoryChange = async(e) => {
        setCurrentPage(1)
        const category = e.target.value;
        setSelectedCategory(category)

        const res = await categorySearch(category)
        setBooks(res)
        console.log(res)
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)

    const nextPage = () => {
        if (currentPage < Math.ceil(books.length / booksPerPage)) {
            setFade(true);
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setFade(false);
            }, 300); // Chờ 300ms cho fade-out
        }
    }

    const prePage = () => {
        if (currentPage > 1) {
            setFade(true);
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setFade(false);
            }, 300); // Chờ 300ms cho fade-out
        }
    }

    const popUp = (book) => {
        setBookInforState(true)
        setSelectedBook(book)
    }

    const popOut = () => {
        setBookInforState(false)
        setSelectedBook('')
    }

    return (
        <div className="homePage">
            {bookInforState &&
            <div className="overlay" onClick={popOut}>
                <BookInfor book={selectedBook}></BookInfor>
            </div>
            }
            <div className="bookCate">
            <h2 className="bookCate__title">Phổ biến:</h2>
            <select onChange={handleCategoryChange} value={selectedCategory} className="bookCate__select">
                <option value="">Chọn thể loại</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
                </select>
                <div className={`bookCate__page ${fade ? 'fade-out' : ''}`}>
                    {books.length === 0 && selectedCategory &&(
                        <p className="bookCate__page-none">Không có sách cho thể loại này</p>
                    )}
                    {books.length > 0 && (
                        currentBooks.map((book) => (
                            <div key={book.id} className="bookCate__card" onClick={() => popUp(book)}>
                                <div className="bookCate__img">
                                    <img src={`${getApiUrl()}${book.image}`} alt="" />
                                </div>
                                <div className="bookCate__des">
                                    <h2>{book.title}</h2>
                                    <div className="des">{book.description}</div>
                                    <div className="cross"></div>
                                    <h3>{book.author}</h3>
                                    <p>{book.publishYear}</p>
                                    <h4>{Number(book.price.$numberDecimal).toLocaleString('vi-VN')}đ</h4>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="bookCate__flow">
                    <button onClick={prePage} disabled={currentPage === 1} className="bookCate__pre"><FaArrowLeft /></button>
                    <div className="bookCate_status">{currentPage} / {Math.ceil(books.length / booksPerPage)}</div>
                    <button onClick={nextPage} disabled={currentPage === Math.ceil(books.length / booksPerPage)} className="bookCate__next"><FaArrowRight /></button>
                </div>
            </div>
        </div>
    )
}

export default HDesktop
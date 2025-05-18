import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApiUrl } from "../../../utils/apiUtils";
import "./BookDetails.css";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${getApiUrl()}/api/books`);
        const data = await response.json();

        const foundBook = data.find((b) => {
          const bookId = b._id?.$oid || b._id;
          return bookId === id;
        });

        setBook(foundBook);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sách:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
  };

  if (!book) {
    return <div>Đang tải sách...</div>;
  }

  const imageUrl = book.image.startsWith("http")
    ? book.image
    : `${getApiUrl()}${book.image}`;

  const formatPrice = (priceObj) => {
    if (typeof priceObj === "object" && "$numberDecimal" in priceObj) {
      return parseFloat(priceObj.$numberDecimal);
    }
    return priceObj;
  };

  return (
    <div className="book-details">
      <img src={imageUrl} alt={book.title} className="book-details__image" />
      <div className="book-details__info">
        <h2>{book.title}</h2>
        <p>
          <strong>Tác giả:</strong> {book.author}
        </p>
        <p>
          <strong>Thể loại:</strong> {book.category}
        </p>
        <p>
          <strong>Năm xuất bản:</strong> {book.publishYear}
        </p>
        <p>
          <strong>Giá:</strong> {formatPrice(book.price).toLocaleString()}₫
        </p>
        <p>
          <strong>Mô tả:</strong> {book.description}
        </p>

        <div className="book-detail__btn">
          <button onClick={() => handleAddToCart(book)}>Mượn</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

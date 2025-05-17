import "../PopularMobile/PopularMobile.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { getApiUrl } from "../../../utils/apiUtils.js";
const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const imageUrl = book.image.startsWith("http")
    ? book.image
    : `${getApiUrl()}${book.image}`;
  return (
    <div className="book-card">
      <div className="book-card_container">
        <div className="book-image">
          <img src={imageUrl} alt={book.title} />
        </div>
        <div className="book-details__gap">
          <div className="book-details">
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <div className="book-price">{book.price}₫</div>
            <div className="book-actions">
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(book)}
              >
                Mượn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

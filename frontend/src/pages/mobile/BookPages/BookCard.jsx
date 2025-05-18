import "../PopularMobile/PopularMobile.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { getApiUrl } from "../../../utils/apiUtils.js";
import { Link } from "react-router-dom";
const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // them vao gio hang

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login"); // Chuyển sang trang đăng nhập
      return;
    }
    dispatch(addToCart(product));
  };
  const imageUrl = book.image.startsWith("http")
    ? book.image
    : `${getApiUrl()}${book.image}`;
  return (
    <div className="book-card">
      <div className="book-card_container">
        <div className="book-image">
          <Link to={`/book/${book._id?.$oid || book._id}`}>
            <img src={imageUrl} alt={book.title} />
          </Link>
        </div>

        <div className="book-details__gap">
          <div className="bookcard-details">
            <Link to={`/book/${book._id?.$oid || book._id}`}>
              <div>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <div className="book-price" style={{ color:"red" }}>{book.price}₫</div>
              </div>
            </Link>

            <div className="book-actions">
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(book)}
              >
                {isLoggedIn ? "Mượn" : "Đăng nhập để mượn"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

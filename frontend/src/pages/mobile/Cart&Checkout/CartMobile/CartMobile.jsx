import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApiUrl } from "../../../../utils/apiUtils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import "./CartMobile.css";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
} from "../../../../redux/features/cart/cartSlice";
const CartMobile = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncrease = (product) => {
    dispatch(increaseQuantity(product));
  };
  
  const handleDecrease = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const formatPrice = (priceObj) => {
    if (typeof priceObj === "object" && "$numberDecimal" in priceObj) {
      return parseFloat(priceObj.$numberDecimal);
    }
    return priceObj;
  };
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + formatPrice(item.price) * item.quantity,
    0
  );

  return (
      <div className={`cart-container ${cartItems.length > 0 ? "min__height" : ""}`}>
        <div className="cart-header">
          <div className="cart-header__title">Giỏ hàng</div>
          
          <div className={`cart-header__button--remove ${cartItems.length === 0 ? "hidden__btn" : ""}`}>
              <button onClick={handleClearCart}>Xóa toàn bộ</button>
          </div>
        </div>

        <div className="cart-container--liner"></div>

        <div className="cart-content">
          {cartItems.length > 0 ? (
            <>
              <ul role="list" className="cart-content__products">
                {cartItems.map((product) => {
                  return (
                    <li
                      key={product?.title}
                      className="cart-content__products--card"
                    >
                      <div className="product-img">
                        <img
                          src={`${getApiUrl()}${product.image}`}
                          alt="product-img"
                        />
                      </div>
                      <div className="product-des">
                        <div className="product-des__header">
                          <div className="product-des__title">
                              <Link to="/">{product?.title}</Link>
                          </div>
                          <p className="product-des__category">
                            <strong>Thể loại: </strong>
                            {product?.category}
                          </p>
                          <p className="product-des__quantity">
                            <strong>Số lượng: </strong>
                            <button onClick={() => handleDecrease(product)}>-</button>
                            <span style={{ margin: "0 10px" }}>{product.quantity}</span>
                            <button onClick={() => handleIncrease(product)}>+</button>
                          </p>
                        </div>
                        <div className="product-des__footer">
                          <p className="product-des__price">
                            {formatPrice(product.price).toLocaleString()}đ
                          </p>
                          <div className="product-des__button--remove">
                            <button
                              type="button"
                              onClick={() => handleRemoveFromCart(product)}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            
              
            </>
          ) : (
            <>
              <div className="noCart__content">
                <div className="noCart__content__icon">
                  <FontAwesomeIcon icon={faBasketShopping} />
                </div>
                <p>Không có sản phẩm nào trong giỏ hàng!</p>
                <Link to="/">
                  <button>
                    Xem sách ngay!
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="cart-footer">
                  <div className="total-price">
                    <div className="total-price-title">
                      <p>Tổng tiền: </p>
                      <p style={{ color: "red", fontWeight: "600" }} >{totalPrice ? totalPrice.toLocaleString() : 0}₫</p>
                    </div>
                  </div>
                  <div className="cart-footer__checkout">
                    <Link to="/checkout">Đặt thuê</Link>
                    <div className="cart-footer__nav--home">
                      <div className="cart-footer__nav--home--option">
                        <div className="cart-footer__nav--home--option--liner"></div>
                        <p>Hoặc</p>
                        <div className="cart-footer__nav--home--option--liner"></div>
                      </div>
                      <Link to="/">
                        <button>
                          {/* Tiếp tục xem sách <span aria-hidden="true"> &rarr;</span> */}
                          Tiếp tục xem sách
                        </button>
                      </Link>
                    </div>
                  </div>
          </div>
          ) : (
            <div className=""></div>
        )}
      </div>
  );
};

export default CartMobile;

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApiUrl } from "../../../../utils/apiUtils";
import "./CartMobile.css";
import {
  removeFromCart,
  clearCart,
} from "../../../../redux/features/cart/cartSlice";
const CartMobile = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <>
      <div className="cart-container">
        <div className="cart-header">
          <div className="cart-header__title">Giỏ hàng</div>
          <div className="cart-header__button--remove">
            <button onClick={handleClearCart}>Xóa toàn bộ</button>
          </div>
        </div>
        <div className="cart-content">
          {cartItems.length > 0 ? (
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
                      <div className="product-des__title">
                        <h3>
                          <Link to="/">{product?.title}</Link>
                        </h3>
                        <p>{product?.price}</p>
                        <p>
                          <strong>Thể loại: </strong>
                          {product?.category}
                        </p>
                      </div>
                      <div className="product-des__footer">
                        <p>
                          <strong>Số lượng: </strong>1
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
          ) : (
            <div
              style={{
                marginTop: "20px",
                fontSize: "1.5rem",
              }}
            >
              <p>Không có sản phẩm nào trong giỏ hàng!</p>
            </div>
          )}
        </div>

        <div className="cart-footer">
          <div className="total-price">
            <div className="total-price-title">
              <p>Tổng tiền: </p>
              <p>{totalPrice ? totalPrice : 0}₫</p>
            </div>
          </div>
          <div className="cart-footer__checkout">
            <Link to="/checkout">Thanh toán</Link>
            <div className="cart-footer__nav--home">
              <Link to="/">
                <span style={{ color: "white", padding: "5px" }}>hoặc</span>
                <button>
                  Tiếp tục mua sắm <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartMobile;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../../../redux/features/cart/orderSlice";
import { clearCart } from "../../../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";
import "./CheckoutMobile.css";
import useValidator from "../../../../hooks/useValidator";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    // city: ""
  });


  const useValidatorOptions = {
    rules: [
      useValidator.isRequired(
        '[name="name"]',
        "Vui lòng nhập tên của bạn"
      ),
      useValidator.isEmail('[name="email"]'),
      useValidator.isRequired(
        '[name="phone"]',
        "Vui lòng nhập số điện thoại"
      ),
      useValidator.isPhone('[name="phone"]'),
      useValidator.isRequired(
        '[name="address"]',
        "Vui lòng nhập địa chỉ"
      ),
      useValidator.isRequired(
        '[name="city"]',
        "Vui lòng nhập thành phố"
      ),
    ],
  }
  const {errors, handleChange } =
    useValidator(useValidatorOptions);
  
  const wrappedHandleChange = (e) => {
    handleChange(e);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address, city} = formData;

    // if (!name || !email || !phone || !address || !city) {
    if (!name || !email || !phone || !address) {
      Swal.fire({
        title: "Vui lòng điền đầy đủ thông tin!",
        icon: "error",
        confirmButtonColor: "#17a2b8",
      });
      return;
    }
    if (cartItems.length === 0) {
      Swal.fire({
        title: "Giỏ hàng trống!",
        icon: "error",
        confirmButtonColor: "#17a2b8",
      });
      return;
    }

    const order = {
      ...formData,
      products: cartItems,
      totalQuantity,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    dispatch(createOrder(order));
    Swal.fire("Thành công", "Đơn hàng đã được đặt!", "success").then(() => {
      dispatch(clearCart());
      navigate("/orders");
    });
  };

  const handleCancelCheckOut = (e) => {
    navigate("/cart");
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
    <section className="checkout">
      <div className="checkout__container">
        <div className="checkout__summary">
          <h2 className="checkout__title">Thanh toán</h2>
          <p className="checkout__text">
            Tổng tiền: {totalPrice ? totalPrice.toLocaleString() : 0}₫
          </p>
          <p className="checkout__text">
            Số lượng: {totalQuantity ? totalQuantity.toLocaleString() : 0}
          </p>
        </div>

        <div className="checkout__form-container">
          <form className="checkout__form" onSubmit={handleSubmit}>
            <div className="checkout__section">
              <p className="checkout__section-title">Thông tin người thanh toán</p>
            </div>

            <div className="checkout__field--grid">
              <div className="checkout__field-group">
                <label htmlFor="name" className="checkout__label">
                  Họ và tên
                </label>
                <div className="checkout__label--wrapper">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="checkout__input"
                    onChange={wrappedHandleChange}
                    value={formData.name}
                  />
                  {errors.name && <p className="checkout__error--text">{errors.name}</p>}
                </div>
              </div>

              <div className="checkout__field--divider"></div>

              <div className="checkout__field-group">
                <label htmlFor="email" className="checkout__label">
                  Email
                </label>
                <div className="checkout__label--wrapper">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="checkout__input"
                    onChange={wrappedHandleChange}
                    value={formData.email}
                  />
                  {errors.email && <p className="checkout__error--text">{errors.email}</p>}
                </div>
              </div>

              <div className="checkout__field--divider"></div>

              <div className="checkout__field-group">
                <label htmlFor="phone" className="checkout__label">
                  Số điện thoại
                </label>
                <div className="checkout__label--wrapper">
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    className="checkout__input"
                    onChange={wrappedHandleChange}
                    value={formData.phone}
                  />
                  {errors.phone && <p className="checkout__error--text">{errors.phone}</p>}
                </div>
              </div>

              <div className="checkout__field--divider"></div>

              <div className="checkout__field-group">
                <label htmlFor="address" className="checkout__label">
                  Địa chỉ
                </label>
                <div className="checkout__label--wrapper">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="checkout__input"
                    onChange={wrappedHandleChange}
                    value={formData.address}
                  />
                  {errors.address && <p className="checkout__error--text">{errors.address}</p>}
                </div>
              </div>

              <div className="checkout__field--divider"></div>

              {/* <div className="checkout__field-group">
                <label htmlFor="city" className="checkout__label">
                  Thành phố
                </label>
                <div className="checkout__label--wrapper">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="checkout__input"
                    onChange={wrappedHandleChange}
                    value={formData.city}
                  />
                  {errors.city && <p className="checkout__error--text">{errors.city}</p>}
                </div>
              </div> */}
            </div>

            {/* <div className="checkout__field--speacer"></div> */}

            <div className="checkout__btn--group">
              <div className="checkout__cancel">
                <button 
                  type="button"
                  onClick={handleCancelCheckOut}
                  className="checkout__button"
                >
                  Huỷ
                </button>
              </div>

              <div className="checkout__submit">
                <button className="checkout__button">Đặt hàng</button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;

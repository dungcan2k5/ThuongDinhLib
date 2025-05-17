import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../../../redux/features/cart/orderSlice";
import { clearCart } from "../../../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";
import "./CheckoutMobile.css";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address, city } = formData;

    if (!name || !email || !phone || !address || !city) {
      Swal.fire("Lỗi", "Vui lòng điền đầy đủ thông tin!", "error");
      return;
    }

    const order = {
      ...formData,
      products: cartItems,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    dispatch(createOrder(order));
    Swal.fire("Thành công", "Đơn hàng đã được đặt!", "success").then(() => {
      dispatch(clearCart());
      navigate("/orders");
    });
  };

  return (
    <section className="checkout">
      <div className="checkout__container">
        <div className="checkout__summary">
          <h2 className="checkout__title">Tiền hàng</h2>
          <p className="checkout__text">
            Tổng tiền: {totalPrice ? totalPrice : 0}₫
          </p>
          <p className="checkout__text">Items: {cartItems.length}</p>
        </div>

        <div className="checkout__form-container">
          <form className="checkout__form" onSubmit={handleSubmit}>
            <div className="checkout__section">
              <p className="checkout__section-title">Thông tin cá nhân</p>
              <p className="checkout__section-subtitle">
                Điền đầy đủ thông tin.
              </p>
            </div>

            <div className="checkout__field-group">
              <label htmlFor="name" className="checkout__label">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                className="checkout__input"
                onChange={handleChange}
                value={formData.name}
              />
            </div>

            <div className="checkout__field-group">
              <label htmlFor="email" className="checkout__label">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="checkout__input"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="checkout__field-group">
              <label htmlFor="phone" className="checkout__label">
                Số điện thoại
              </label>
              <input
                type="number"
                id="phone"
                className="checkout__input"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>

            <div className="checkout__field-group">
              <label htmlFor="address" className="checkout__label">
                địa chỉ
              </label>
              <input
                type="text"
                id="address"
                className="checkout__input"
                onChange={handleChange}
                value={formData.address}
              />
            </div>

            <div className="checkout__field-group">
              <label htmlFor="city" className="checkout__label">
                Thành phố
              </label>
              <input
                type="text"
                id="city"
                className="checkout__input"
                onChange={handleChange}
                value={formData.city}
              />
            </div>

            <div className="checkout__submit">
              <button className="checkout__button">Đặt hàng</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;

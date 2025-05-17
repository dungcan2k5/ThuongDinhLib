import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
// import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import "./CheckoutMobile.css";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  //   const { currentUser } = useAuth();
  //   const navigate = useNavigate();
  //   const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [isChecked, setIsChecked] = useState(false);

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();

  //   const onSubmit = async (data) => {
  // const newOrder = {
  //   name: data.name,
  //   email: currentUser?.email,
  //   address: {
  //     city: data.city,
  //   },
  //   phone: data.phone,
  //   productIds: cartItems.map((item) => item?._id),
  //   totalPrice: totalPrice,
  // };
  // try {
  //   await createOrder(newOrder).unwrap();
  //   Swal.fire({
  //     title: "Confirmed Order",
  //     text: "Your order placed successfully!",
  //     icon: "success",
  //     confirmButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, It's Okay!",
  //   });
  //   navigate("/orders");
  // } catch (error) {
  //   console.error("Error placing order", error);
  //   alert("Failed to place an order");
  // }
  //   };

  //   if (isLoading) return <div>Loading....</div>;

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
          <form className="checkout__form">
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
                // {...register("name", { required: true })}
                type="text"
                id="name"
                className="checkout__input"
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
                disabled
                // defaultValue={currentUser?.email}
              />
            </div>

            <div className="checkout__field-group">
              <label htmlFor="phone" className="checkout__label">
                Số điện thoại
              </label>
              <input
                // {...register("phone", { required: true })}
                type="number"
                id="phone"
                className="checkout__input"
              />
            </div>

            <div className="checkout__field-group">
              <label htmlFor="address" className="checkout__label">
                địa chỉ
              </label>
              <input
                // {...register("address", { required: true })}
                type="text"
                id="address"
                className="checkout__input"
              />
            </div>

            <div className="checkout__field-group">
              <label htmlFor="city" className="checkout__label">
                Thành phố
              </label>
              <input
                // {...register("city", { required: true })}
                // type="text"
                id="city"
                className="checkout__input"
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

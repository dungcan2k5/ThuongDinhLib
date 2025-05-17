import { useSelector } from "react-redux";
import "./OrderMobile.css";
import { getApiUrl } from "../../../../utils/apiUtils";
const OrderMobile = () => {
  const order = useSelector((state) => state.order.currentOrder);
  const formatPrice = (priceObj) => {
    if (typeof priceObj === "object" && "$numberDecimal" in priceObj) {
      return parseFloat(priceObj.$numberDecimal);
    }
    return priceObj;
  };
  if (!order) {
    return (
      <p style={{ fontSize: "1.5rem" }}>Không có đơn hàng nào được đặt.</p>
    );
  }

  return (
    <div className="orders">
      <h2>Đơn hàng của bạn</h2>
      <p>
        <strong>Họ tên:</strong> {order.name}
      </p>
      <p>
        <strong>Email:</strong> {order.email}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {order.address}, {order.city}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {order.phone}
      </p>
      <p>
        <strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString()}₫
      </p>

      <h3>Sản phẩm đã đặt:</h3>
      <ul>
        {order.products.map((product, index) => (
          <li key={index} className="product-item">
            <img
              src={`${getApiUrl()}${product.image}`}
              alt={product.title}
              className="product-image"
            />
            <div className="product-info">
              <p className="product-title">{product.title}</p>
              <p className="product-price">{product.price}₫</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderMobile;

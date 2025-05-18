import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./OrderMobile.css";
import { getApiUrl } from "../../../../utils/apiUtils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

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
      <div className="noOrder">
        <h2>Đơn hàng</h2>
        <div className="noOrder__liner"></div>
        <div className="noOrder__content">
          <div className="noOrder__content__icon">
            <FontAwesomeIcon icon={faTruckFast} />
          </div>
          <p>Chưa có đơn hàng nào được đặt!</p>
          <Link to="/cart">
            <button>
              Thuê sách ngay!
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    
    <div className="orders">
      <h2>Đơn hàng của bạn</h2>
      <p className="orders__nameCus">
        <strong>Họ tên:</strong> {order.name}
      </p>
      <p className="orders__emailCus">
        <strong>Email:</strong> {order.email}
      </p>
      <p className="orders__addressCus">
        {/* <strong>Địa chỉ:</strong> {order.address}, {order.city} */}
        <strong>Địa chỉ:</strong> {order.address}
      </p>
      <p className="orders__phoneCus">
        <strong>Số điện thoại:</strong> {order.phone}
      </p>
      <p className="orders__sumPrice">
        <strong>Tổng tiền:</strong>
        <p className="price">{formatPrice(order.totalPrice).toLocaleString()}₫</p>
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
              <div className="product-quantity">Số lượng: {product.quantity}</div>
              <p className="product-price">
                {formatPrice(product.price).toLocaleString()}₫
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderMobile;

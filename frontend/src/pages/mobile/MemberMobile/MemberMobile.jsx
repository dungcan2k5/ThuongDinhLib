import "./MemberMobile.css";
import { Link } from "react-router-dom";
import MemberImg from "../../../assets/mobile-imgs/book-shelf-concept.jpg";
const MemberMobile = () => {
  return (
    <div className="member-container">
      <div className="member-title">
        Tạo tài khoản <br />
        nhận ngay ưu đãi giảm giá 15%
      </div>
      <div className="member-des">
        Hãy tạo tài khoản tại hiệu sách trực tuyến của chúng tôi ngay hôm nay để
        bắt đầu tận hưởng những ưu đãi tuyệt vời cho tất cả các đơn của bạn! Khi
        đăng ký, bạn sẽ nhận được giảm giá 15% cho tất cả các khoản thanh toán,
        giúp bạn dễ dàng hơn bao giờ hết để sở hữu những cuốn sách yêu thích.
      </div>
      <div className="member-submit">
        <Link to="/register">
          <button>Đăng ký!</button>
        </Link>
      </div>
      <div className="member-footer">
        <img src={MemberImg} alt="member-footer" />
      </div>
    </div>
  );
};

export default MemberMobile;

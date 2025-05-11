import "./FooterMobile.css";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-title">THƯ VIỆN THƯỢNG ĐÌNH</div>
      <div>
        <p>
          <b>Địa chỉ: </b> Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà Nội
        </p>
      </div>
      <div>
        <p>
          <b>Liên hệ: </b>024 87245901
        </p>
      </div>
      <div>
        <p>
          <b>Email: </b>
          p.thuongdinh@gmail.com
        </p>
      </div>
      <div className="footer-link">
        <a href="https://www.facebook.com/">
          <div className="footer-icon">
            {" "}
            <FaFacebook />
          </div>
        </a>

        <a href="/">
          <div className="footer-icon">
            <FaGoogle />
          </div>
        </a>
        <a href="https://www.instagram.com/">
          <div className="footer-icon">
            <FaInstagram />
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

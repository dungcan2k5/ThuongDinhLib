import React from "react";
import { useEffect, useState } from "react";
import fetchProfile from "../../../services/userService";
import './UserDashboard.css'
import { FaUser } from "react-icons/fa";
import ChangeInforForm from "../changeInforForm";
import PasswordChange from "../passwordChange/passwordChange";
import { faL } from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {

  const [userData, setUserData] = useState({
  name: "",
  email: "",
  address: "",
  phone: "",
  membershipDate: ""
  });

  const [logined, setLogined] = useState(true)
  const [inforChange, setInforChange] = useState(false)
  const [passwordshow, setPasswordShow] = useState(false)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLogined(false);
        return;
      }

      const getUser = async () => {
        try {
          const res = await fetchProfile(token);
          console.log(res)
          setUserData(res.data)
        } catch (error) {
          console.error("Không thể lấy thông tin người dùng");
        }
      };
      getUser();
    }, []);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLogined(false);
        return;
      }

      const getUser = async () => {
        try {
          const res = await fetchProfile(token);
          setUserData(res.data);
        } catch (error) {
          console.error("Không thể lấy thông tin người dùng");
        }
    };

  getUser();
}, [trigger]);
    
    const closeChangeInfor = () => {
      setInforChange(false);
    };

    const closepasswordChange = () => {
      setPasswordShow(false);
    };

    if (!logined) {
      return <div style={{ color: "red", padding: "1rem" }}>Bạn chưa đăng nhập. Vui lòng đăng nhập để xem thông tin tài khoản.</div>;
    }

      return (
          <div className="UserDashBoard">
              <div className="UserDashBoard__title">
                <h2>Thông Tin Đăng Nhập</h2>
              </div>
              <div className="UserDashBoard__content">
                <div className="UserDashBoard__pre">
                  <FaUser className="UserDashBoard__icon"/>
                  <h2>{userData.name}</h2>
                </div>
                <div className="UserDashBoard__personal">
                  <h2>Thông tin cá nhân</h2>
                  <div className="UserDashBoard__personal-content">
                    <div className="UserDashBoard__infor UserDashBoard__name"><span>Họ Tên:</span>{userData.name}</div>
                    <div className="UserDashBoard__infor UserDashBoard_address"><span>Địa Chỉ:</span>{userData.address}</div>
                    <div className="UserDashBoard__infor UserDashBoard__phone"><span>Số điện thoại:</span>{userData.phone}</div>
                  </div>
                  <button onClick={() => {setInforChange(true)}}>Thay đổi thông tin</button>
                </div>
                <div className="UserDashBoard__account">
                  <h2>Thông tin tài khoản</h2>
                  <div className="UserDashBoard_account-content">
                    <div className="UserDashBoard__infor UserDashBoard__email"><span>Email: </span>{userData.email}</div>
                    <div className="UserDashBoard__infor UserDashBoard__membershipDate"><span>Thời gian hội viên: </span>{userData.membershipDate}</div>
                  </div>
                  <button onClick={() => {setPasswordShow(true)}}>Đổi mật khẩu</button>
                </div>
              </div>
              {inforChange && (
                <ChangeInforForm currentInfor={userData} closeChangeInfor={closeChangeInfor} onUpdateSuccess={() => setTrigger(prev => !prev)}/>
              )}
              {passwordshow && (
                <PasswordChange closepasswordChange={closepasswordChange} onUpdateSuccess={() => setTrigger(prev => !prev)}/>
              )
              }
          </div>
    )
}

export default UserDashboard
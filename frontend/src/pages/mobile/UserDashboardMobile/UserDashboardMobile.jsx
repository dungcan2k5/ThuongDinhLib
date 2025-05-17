import React, { useState, useEffect, useMemo } from 'react';
import useValidator from "../../../hooks/useValidator";
import "./UserDashboardMobile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { showSuccess, showError } from "../../../redux/features/cart/notificationSlice";

const UserDashboardMobile = () => {
  const [customer, setCustomer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const dispatch = useDispatch();

  const rules = useMemo(() => [
    useValidator.isRequired('[name="name"]', 'Vui lòng nhập tên của bạn'),
    useValidator.isRequired('[name="phone"]', 'Vui lòng nhập số điện thoại'),
    useValidator.isPhone('[name="phone"]'),
    useValidator.isRequired('[name="address"]', 'Vui lòng nhập địa chỉ'),
    ...(changePasswordMode ? [
      useValidator.minLength('[name="currentPassword"]', 6),
      useValidator.minLength('[name="newPassword"]', 6),
      useValidator.isConfirmed(
        '[name="confirmPassword"]',
        () => document.querySelector('#userDashboardMobile [name="newPassword"]')?.value || "",
        "Mật khẩu nhập lại không chính xác"
      )
    ] : [])
  ], [changePasswordMode]);

  // useValidator
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
  } = useValidator({
    rules,
    onSubmit: async (formValues) => {
      const token = localStorage.getItem('token');
      const submitData = { ...formValues };
        // Nếu không đổi mật khẩu thì loại bỏ các trường mật khẩu
        if (!changePasswordMode) {
          delete submitData.currentPassword;
          delete submitData.newPassword;
          delete submitData.confirmPassword;
        }

        try {
          const res = await fetch(
            "http://localhost:5001/api/customers/profile",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(submitData),
            }
          );

          if (!res.ok) {
            const errorData = await res.json(); // lấy message từ backend
            throw new Error(errorData.message || "Cập nhật thất bại");
          }

          dispatch(showSuccess("Cập nhật thành công"));

          fetchCustomerProfile(); // Load lại thông tin
          setEditMode(false);
          setChangePasswordMode(false);
        } catch (err) {
          dispatch(showError(err.message));

        }
      },
    });

  const fetchCustomerProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/customers/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Không thể lấy thông tin người dùng");
      const data = await res.json();

      setCustomer(data);
      setValues({
        name: data.name || "",
        phone: data.phone || "",
        address: data.address || "",
        email: data.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Lỗi:", err.message);
    }
  };

  useEffect(() => {
    fetchCustomerProfile();
  }, []);

  const handleCancelChangeInfor = () => {
    if (customer) {
      setValues({
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        email: customer.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
      setEditMode(false);
    }
  };

  const handleCancelChangePassword = () => {
    setValues((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setErrors({});
    setChangePasswordMode(false);
  };

  if (!customer) return <p>Đang tải thông tin...</p>;

  return (
    <div className="userDashboardMobile">
      <div className="userDashboardMobile__title">
        <h2>Thông tin đăng nhập</h2>
      </div>

      <div className="spacer"></div>

      <div className="userDashboardMobile__avatar">
        <div className="userDashboardMobile__avatar--icon">
          <FontAwesomeIcon icon={faCircleUser} />
        </div>
        <div className="userDashboardMobile__avatar--nameUser">
          <h3>{customer.name}</h3>
        </div>
      </div>

      <form id="userDashboardMobile" onSubmit={handleSubmit}>
        <div className="userDashboardMobile__inforUser">
          <div className="userDashboardMobile__infor--title">
            <h3>Thông tin cá nhân</h3>
          </div>

          <div className="spacer"></div>

          <div className="userDashboardMobile__infor--grid">
            <div className="userDashboardMobile__infor">
              <h6 className="userDashboardMobile__infor--label">Họ tên</h6>
              {editMode ? (
                <div className="input--wrapper">
                  <input
                    type="text"
                    name="name"
                    className="change__infor__input"
                    value={values.name || ""}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="error--text">{errors.name}</p>}
                </div>
              ) : (
                <p>{customer.name}</p>
              )}
            </div>

            <div className="info-divider"></div>

            <div className="userDashboardMobile__infor">
              <h6 className="userDashboardMobile__infor--label">
                Số điện thoại
              </h6>
              {editMode ? (
                <div className="input--wrapper">
                  <input
                    type="text"
                    name="phone"
                    className="change__infor__input"
                    value={values.phone || ""}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="error--text">{errors.phone}</p>
                  )}
                </div>
              ) : (
                <p>{customer.phone}</p>
              )}
            </div>

            <div className="info-divider"></div>

            <div className="userDashboardMobile__infor">
              <h6 className="userDashboardMobile__infor--label">Địa chỉ</h6>
              {editMode ? (
                <div className="input--wrapper">
                  <input
                    type="text"
                    name="address"
                    className="change__infor__input"
                    value={values.address || ""}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <p className="error--text">{errors.address}</p>
                  )}
                </div>
              ) : (
                <p>{customer.address}</p>
              )}
            </div>

            <div className="info-divider"></div>

          </div>


          {!editMode ? (
            <button
              type="button"
              className="change__infor__btn"
              onClick={() => setEditMode(true)}
            >
              Cập nhật thông tin cá nhân
            </button>
          ) : (
            <div className="infor__btn__group">
              <button
                type="button"
                className="cancel__infor__btn"
                onClick={handleCancelChangeInfor}
              >
                Quay lại
              </button>
              <button type="submit" className="save__infor__btn">
                Lưu thông tin
              </button>
            </div>
          )}
        </div>

        <div className="userDashboardMobile__inforAccount">
          <div className="userDashboardMobile__infor--title">
            <h3>Thông tin tài khoản</h3>
          </div>

          <div className="spacer"></div>

          <div className="userDashboardMobile__infor--grid">
            <div className="userDashboardMobile__infor">
              <h6 className="userDashboardMobile__infor--label">Email</h6>
              <p>{customer.email}</p>
            </div>

            <div className="info-divider"></div>

            <div className="userDashboardMobile__infor">
              <h6 className="userDashboardMobile__infor--label">Mật khẩu</h6>

              {!changePasswordMode ? (
                <button
                  className="change__password__btn"
                  type="button"
                  onClick={() => setChangePasswordMode(true)}
                >
                  Đổi mật khẩu
                </button>
              ) : (
                <div className="change__pasword__form">
                  <div className="input--wrapper margining">
                    <input
                      type="password"
                      placeholder="Mật khẩu hiện tại"
                      className="change__password__input"
                      name="currentPassword"
                      value={values.currentPassword || ""}
                      onChange={handleChange}
                    />
                    {errors.currentPassword && (
                      <p className="error--text">{errors.currentPassword}</p>
                    )}
                  </div>

                  <div className="input--wrapper margining">
                    <input
                      type="password"
                      placeholder="Mật khẩu mới"
                      name="newPassword"
                      className="change__password__input"
                      value={values.newPassword || ""}
                      onChange={handleChange}
                    />
                    {errors.newPassword && (
                      <p className="error--text">{errors.newPassword}</p>
                    )}
                  </div>

                  <div className="input--wrapper">
                    <input
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      name="confirmPassword"
                      className="change__password__input"
                      value={values.confirmPassword || ""}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <p className="error--text">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="btn__password__group">
                    <button
                      type="button"
                      className="cancel__password__btn"
                      onClick={handleCancelChangePassword}
                    >
                      Quay lại
                    </button>
                    <button type="submit" className="save__password__btn">
                      Lưu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDashboardMobile;

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../ManageAccounts.css"; // Ensure this file exists
import { getApiUrl } from "../../../utils/apiUtils";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${getApiUrl()}/api/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Không thể tải danh sách khách hàng");
      const data = await response.json();
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        console.warn("API response is not an array:", data);
        setCustomers([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
      alert(error.message || "Có lỗi xảy ra khi tải danh sách khách hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditForm({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
    setEditForm({ name: "", email: "", phone: "", address: "" });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (form) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

    if (!emailRegex.test(form.email)) {
      alert("Email không hợp lệ");
      return false;
    }
    if (!phoneRegex.test(form.phone)) {
      alert("Số điện thoại không hợp lệ");
      return false;
    }
    if (form.name.trim().length < 2) {
      alert("Tên phải có ít nhất 2 ký tự");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm(editForm) || !selectedCustomer) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${getApiUrl()}/api/customers/${selectedCustomer._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Cập nhật khách hàng thất bại");
      }
      alert("Cập nhật khách hàng thành công");
      fetchCustomers();
      handleClose();
    } catch (error) {
      console.error("Error updating customer:", error);
      alert(error.message || "Có lỗi xảy ra khi cập nhật khách hàng");
    }
  };

  const handleDelete = async (customerId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${getApiUrl()}/api/customers/${customerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Xóa khách hàng thất bại");
      }
      alert("Xóa khách hàng thành công");
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert(error.message || "Có lỗi xảy ra khi xóa khách hàng");
    }
  };

  return (
    <div className="acc-manage-accounts">
      <div className="acc-header">
        <h2 className="acc-header__title">Danh sách khách hàng</h2>
      </div>
      <div className="acc-container">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : customers.length === 0 ? (
          <p style={{ marginLeft: "1.5rem" }}>Không có dữ liệu khách hàng</p>
        ) : (
          <table
            className="acc-table-container"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f4f4f4",
                  borderBottom: "2px solid #ddd",
                }}
              >
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Tên
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Số điện thoại
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Địa chỉ
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Ngày tham gia
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer._id}
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <td style={{ padding: "10px" }}>{customer.name || "N/A"}</td>
                  <td style={{ padding: "10px" }}>{customer.email || "N/A"}</td>
                  <td style={{ padding: "10px" }}>{customer.phone || "N/A"}</td>
                  <td style={{ padding: "10px" }}>
                    {customer.address || "N/A"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {customer.membershipDate
                      ? new Date(customer.membershipDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <button
                      className="acc-edit-btn"
                      onClick={() => handleEdit(customer)}
                      style={{
                        marginRight: "10px",
                        padding: "5px 10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="acc-delete-btn"
                      onClick={() => handleDelete(customer._id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {open && (
        <div
          className="acc-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="acc-modal"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div
              className="acc
            -modal-header"
            >
              <h3>Sửa thông tin khách hàng</h3>
              <button
                className="acc
                -close-btn"
                onClick={handleClose}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div
              className="acc
            -modal-content"
            >
              <div
                className="acc
              -form-group"
                style={{ marginBottom: "15px" }}
              >
                <label>Tên</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div
                className="acc
              -form-group"
                style={{ marginBottom: "15px" }}
              >
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div
                className="acc
              -form-group"
                style={{ marginBottom: "15px" }}
              >
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div
                className="acc
              -form-group"
                style={{ marginBottom: "15px" }}
              >
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
            <div
              className="acc
              -modal-footer"
              style={{ marginTop: "20px", textAlign: "right" }}
            >
              <button
                className="acc
                -cancel-btn"
                onClick={handleClose}
                style={{
                  padding: "8px 16px",
                  marginRight: "10px",
                  backgroundColor: "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Hủy
              </button>
              <button
                className="acc
                -save-btn"
                onClick={handleSubmit}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCustomers;

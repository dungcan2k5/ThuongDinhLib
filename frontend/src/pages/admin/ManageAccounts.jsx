import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./ManageAccounts.css";
import { getApiUrl } from "../../utils/apiUtils";

const ManageAccounts = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    salary: "",
    password: "",
  });
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    salary: "",
    password: "",
    isAdmin: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${getApiUrl()}/api/staffs`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setStaffs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching staffs:", error);
      setStaffs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setEditForm({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      salary: staff.salary.$numberDecimal,
      password: "", // Empty by default since we don't get password from backend
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStaff(null);
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
    if (form.role.trim().length < 2) {
      alert("Chức vụ phải có ít nhất 2 ký tự");
      return false;
    }
    if (form.salary <= 0) {
      alert("Lương phải lớn hơn 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm(editForm)) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${getApiUrl()}/api/staffs/${selectedStaff._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );
      if (response.ok) {
        fetchStaffs();
        handleClose();
      }
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!validateForm(createForm)) return;
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${getApiUrl()}/api/staffs/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createForm),
      });
      if (response.ok) {
        alert("Thêm nhân viên thành công");
        fetchStaffs();
        setCreateOpen(false);
        setCreateForm({
          name: "",
          email: "",
          phone: "",
          role: "",
          salary: "",
          password: "",
          isAdmin: false,
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error creating staff:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCreateForm({
      ...createForm,
      [e.target.name]: value,
    });
  };

  const handleDelete = async (staffId, isAdmin) => {
    if (isAdmin) {
      alert("Không thể xóa tài khoản admin");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${getApiUrl()}/api/staffs/${staffId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          alert("Xóa nhân viên thành công");
          fetchStaffs();
        } else {
          alert(data.message || "Xóa nhân viên thất bại");
        }
      } catch (error) {
        console.error("Error deleting staff:", error);
        alert("Có lỗi xảy ra khi xóa nhân viên");
      }
    }
  };

  return (
    <div className="acc-manage-accounts">
      <div className="acc-header">
        <h2 className="acc-header__title">Danh sách nhân viên</h2>
        <button className="acc-add-btn" onClick={() => setCreateOpen(true)}>
          <span
            style={{
              fontSize: "2rem",
              marginRight: "0.5rem",
              fontWeight: "bold",
            }}
          >
            +
          </span>
          Thêm nhân viên
        </button>
      </div>
      <div className="acc-container">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <table className="acc-table-container">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Chức vụ</th>
                <th>Lương</th>
                <th>Ngày vào làm</th>
                <th>Quyền Admin</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(staffs) && staffs.length > 0 ? (
                staffs.map((staff) => (
                  <tr key={staff._id}>
                    <td>{staff.name}</td>
                    <td>{staff.email}</td>
                    <td>{staff.phone}</td>
                    <td>{staff.role}</td>
                    <td>{staff.salary.$numberDecimal}</td>
                    <td>{new Date(staff.hireDate).toLocaleDateString()}</td>
                    <td>{staff.isAdmin ? "Có" : "Không"}</td>
                    <td>
                      <button
                        className="acc-edit-btn"
                        onClick={() => handleEdit(staff)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        className="acc-delete-btn"
                        onClick={() => handleDelete(staff._id, staff.isAdmin)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Staff Modal */}
      {createOpen && (
        <div className="acc-modal-overlay">
          <div className="acc-modal">
            <div className="acc-modal-header">
              <h3>Thêm nhân viên mới</h3>
              <button
                className="acc-close-btn"
                onClick={() => setCreateOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="acc-modal-content">
                <div className="acc-form-group">
                  <label>Tên</label>
                  <input
                    type="text"
                    name="name"
                    value={createForm.name}
                    onChange={handleCreateChange}
                  />
                </div>
                <div className="acc-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={createForm.email}
                    onChange={handleCreateChange}
                  />
                </div>
                <div className="acc-form-group">
                  <label>Mật khẩu</label>
                  <input
                    type="password"
                    name="password"
                    value={createForm.password}
                    onChange={handleCreateChange}
                  />
                </div>
                <div className="acc-form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={createForm.phone}
                    onChange={handleCreateChange}
                  />
                </div>
                <div className="acc-form-group">
                  <label>Chức vụ</label>
                  <input
                    type="text"
                    name="role"
                    value={createForm.role}
                    onChange={handleCreateChange}
                  />
                </div>
                <div className="acc-form-group">
                  <label>Lương</label>
                  <input
                    type="number"
                    name="salary"
                    value={createForm.salary}
                    onChange={handleCreateChange}
                  />
                </div>
                <div className="acc-form-checkbox">
                  <label>Là Admin</label>
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={createForm.isAdmin}
                    onChange={handleCreateChange}
                  />
                </div>
              </div>
              <div className="acc-modal-footer">
                <button
                  type="button"
                  className="acc-cancel-btn"
                  onClick={() => setCreateOpen(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="acc-save-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {open && (
        <div className="acc-modal-overlay">
          <div className="acc-modal">
            <div className="acc-modal-header">
              <h3>Sửa thông tin nhân viên</h3>
              <button className="acc-close-btn" onClick={handleClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="acc-modal-content">
              <div className="acc-form-group">
                <label>Tên</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                />
              </div>
              <div className="acc-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                />
              </div>
              <div className="acc-form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="acc-form-group">
                <label>Chức vụ</label>
                <input
                  type="text"
                  name="role"
                  value={editForm.role}
                  onChange={handleChange}
                />
              </div>
              <div className="acc-form-group">
                <label>Lương</label>
                <input
                  type="number"
                  name="salary"
                  value={editForm.salary}
                  onChange={handleChange}
                />
              </div>
              <div className="acc-form-group">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  name="password"
                  value={editForm.password}
                  onChange={handleChange}
                  placeholder="Để trống nếu không đổi mật khẩu"
                />
              </div>
            </div>
            <div className="acc-modal-footer">
              <button className="acc-cancel-btn" onClick={handleClose}>
                Hủy
              </button>
              <button className="acc-save-btn" onClick={handleSubmit}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccounts;

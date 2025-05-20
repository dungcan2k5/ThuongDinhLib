import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTimes,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../ManageBooks.css";
import { getApiUrl } from "../../../utils/apiUtils";

const ManageCategories = () => {
  const initialValues = {
    category: "",
    description: "", // chỉ nội bộ
    quantity: 0,
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getApiUrl()}/api/books/categories`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      const categoriesWithDesc = data.map((cat, index) => ({
        ...cat,
        _id: cat._id || index,
        description: "",
      }));

      setCategories(categoriesWithDesc);
    } catch (error) {
      alert("Không thể tải danh mục sách");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const validateForm = (data) => {
    if (!data.category?.trim()) return alert("Vui lòng nhập tên danh mục");
    if (data.quantity == null || data.quantity < 0)
      return alert("Số lượng không hợp lệ");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    try {
      const token = localStorage.getItem("token");

      const bodyData = {
        category: formData.category,
        quantity: formData.quantity,
      };

      const response = await fetch(
        `${getApiUrl()}/api/books/categories${
          editingId ? `/${editingId}` : ""
        }`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (!response.ok) throw new Error((await response.json()).message);
      alert(`${editingId ? "Cập nhật" : "Thêm"} danh mục thành công`);
      setIsModalVisible(false);
      setFormData(initialValues);
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      alert(error.message || "Có lỗi xảy ra khi xử lý danh mục");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      category: item.category,
      description: item.description || "",
      quantity: item.quantity,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá danh mục này?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${getApiUrl()}/api/books/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error((await response.json()).message);
      alert("Xóa danh mục thành công");
      fetchCategories();
    } catch (error) {
      alert(error.message || "Xoá thất bại");
    }
  };
  return (
    <div className="manage-books">
      <div className="book-header">
        <h2 className="books-header__title">Quản lý danh mục sách</h2>
        <button
          className="book-add-btn"
          onClick={() => {
            setFormData(initialValues);
            setEditingId(null);
            setIsModalVisible(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "0.5rem" }} />
          Thêm danh mục
        </button>
      </div>

      <div className="book-container">
        <table className="book-table-container">
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr key={item._id}>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    className="book-btn-edit"
                    onClick={() => handleEdit(item)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="book-btn-delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalVisible && (
        <div className="book-modal">
          <div className="modal-content">
            <div className="book-modal-header">
              <h3>{editingId ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</h3>
              <button
                className="book-close-btn"
                onClick={() => setIsModalVisible(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="book-form-group">
                <label>Tên danh mục</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="book-form-group">
                <label>Mô tả (chỉ admin)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="book-form-group">
                <label>Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="book-cancel-btn"
                  onClick={() => setIsModalVisible(false)}
                >
                  Huỷ
                </button>
                <button type="submit" className="book-save-btn">
                  {editingId ? "Lưu" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;

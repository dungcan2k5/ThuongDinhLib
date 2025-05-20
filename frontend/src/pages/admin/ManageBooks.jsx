import { useState, useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { searchBooks } from "../../services/bookService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTimes,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./ManageBooks.css";
import { getApiUrl } from "../../utils/apiUtils";
import "../../components/mobile/HeaderMobile/HeaderMobile.css";

const ManageBooks = () => {
  const initialValues = {
    title: "",
    isbn: "",
    author: "",
    category: "",
    publishYear: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  };

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState(initialValues);

  // Add new state for image preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getApiUrl()}/api/books`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (data) => {
    if (!data.title?.trim()) {
      alert("Vui lòng nhập tên sách");
      return false;
    }
    if (!data.isbn?.trim()) {
      alert("Vui lòng nhập ISBN");
      return false;
    }
    if (!data.author?.trim()) {
      alert("Vui lòng nhập tên tác giả");
      return false;
    }
    if (!data.category?.trim()) {
      alert("Vui lòng nhập thể loại");
      return false;
    }
    if (!data.publishYear || data.publishYear < 1900) {
      alert("Năm xuất bản không hợp lệ");
      return false;
    }
    if (!data.price || data.price <= 0) {
      alert("Giá tiền không hợp lệ");
      return false;
    }
    if (!data.quantity || data.quantity < 0) {
      alert("Số lượng không hợp lệ");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    try {
      let uploadedImageUrl = imageUrl;
      const token = localStorage.getItem("token");
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const uploadResponse = await fetch(`${getApiUrl()}/api/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Tải ảnh lên thất bại");
        }
        const uploadData = await uploadResponse.json();
        uploadedImageUrl = uploadData.url;
      }

      const response = await fetch(
        `${getApiUrl()}/api/books${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, image: uploadedImageUrl }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      alert(`${editingId ? "Cập nhật" : "Thêm"} sách thành công`);
      setIsModalVisible(false);
      setFormData(initialValues);
      setImageUrl("");
      setSelectedFile(null);
      setPreviewUrl("");
      setEditingId(null);
      fetchBooks();
    } catch (error) {
      alert(error.message || "Có lỗi xảy ra");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" || name === "publishYear"
          ? Number(value)
          : value,
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${getApiUrl()}/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Xóa sách thành công");
      fetchBooks();
    } catch (error) {
      alert(error.message || "Xóa sách thất bại");
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setFormData({
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      category: book.category,
      publishYear: book.publishYear,
      price: book.price.$numberDecimal,
      quantity: book.quantity,
      description: book.description || "",
    });
    setImageUrl(book.image || "");
    setIsModalVisible(true);
  };

  const handleImageSelect = (file) => {
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const columns = [
    { id: "title", label: "Tên sách" },
    { id: "isbn", label: "ISBN" },
    { id: "author", label: "Tác giả" },
    { id: "category", label: "Thể loại" },
    { id: "publishYear", label: "Năm xuất bản" },
    { id: "price", label: "Giá" },
    { id: "quantity", label: "Số lượng" },
    { id: "image", label: "Hình ảnh" },
    { id: "actions", label: "Thao tác" },
  ];

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        console.log("Searching for:", searchTerm);
        const results = await searchBooks(searchTerm);
        console.log("Search results:", results);
        setSearchResults(results || []);
      } catch (error) {
        console.error("Lỗi tìm kiếm sách:", error);
        setSearchResults([]);
      }
    };

    const delay = setTimeout(() => fetchResults(), 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="manage-books">
      <div className="book-header">
        <h2 className="books-header__title">Danh sách sách</h2>
        <button
          className="book-add-btn"
          onClick={() => {
            setEditingId(null);
            setFormData(initialValues);
            setImageUrl("");
            setPreviewUrl("");
            setSelectedFile(null);
            setIsModalVisible(true);
          }}
        >
          <span
            style={{
              fontSize: "2rem",
              marginRight: "0.5rem",
              fontWeight: "bold",
            }}
          >
            +
          </span>
          Thêm sách
        </button>
      </div>

      <div className="header-mobile__search" ref={searchRef}>
        <div className="header-mobile__search--icon">
          <IoSearchOutline />
        </div>
        <div>
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="header-mobile__search--input"
            value={searchTerm}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isFocused && searchResults.length > 0 && (
          <ul className="header-mobile__search-suggestions">
            {searchResults.map((book) => (
              <li
                key={book._title}
                className="header-mobile__search-suggestion-item"
                style={{
                  display: "flex",
                  padding: "10px",
                }}
              >
                <Link
                  onClick={() => {
                    setSearchTerm("");
                    setIsFocused(false);
                    setSearchResults([]);
                  }}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  <div
                    className="suggestion-content"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={`${getApiUrl()}${book.image}`}
                      alt={book.title || "Book image"}
                      width={60}
                      style={{ objectFit: "cover" }}
                    />
                    <div className="suggestion-info">
                      <strong>{book.title || "No title"}</strong>
                      <p>{book.author || "Unknown author"}</p>
                      <p style={{ color: "red", fontWeight: "bolder" }}>
                        {parseFloat(
                          book.price?.$numberDecimal || book.price || 0
                        ).toLocaleString()}
                        ₫
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="book-container">
        <table className="book-table-container">
          <thead>
            <tr>
              <th>Tên sách</th>
              <th>ISBN</th>
              <th>Tác giả</th>
              <th>Thể loại</th>
              <th>Năm xuất bản</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Hình ảnh</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.isbn}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.publishYear}</td>
                <td>{book.price.$numberDecimal}</td>
                <td>{book.quantity}</td>
                <td>
                  {book.image && (
                    <img
                      src={`${getApiUrl()}${book.image}`}
                      alt={book.title}
                      onClick={() =>
                        window.open(`${getApiUrl()}${book.image}`, "_blank")
                      }
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="book-btn-edit"
                    onClick={() => handleEdit(book)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="book-btn-delete"
                    onClick={() => handleDelete(book._id)}
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
              <h3>{editingId ? "Chỉnh sửa sách" : "Thêm mới sách"}</h3>
              <button
                className="book-close-btn"
                onClick={() => setIsModalVisible(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="book-form-group">
                <label>Tên sách</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="book-form-group">
                <label>ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="book-form-group">
                <label>Tác giả</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="book-form-group">
                <label>Thể loại</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="book-form-group">
                <label>Năm xuất bản</label>
                <input
                  type="number"
                  name="publishYear"
                  value={formData.publishYear}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="book-form-group">
                <label>Giá</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
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
                  step="1"
                  required
                />
              </div>

              <div className="book-form-group">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="upload-img">
                <label className="upload-label">
                  <FontAwesomeIcon icon={faUpload} /> Tải ảnh lên
                  <input
                    type="file"
                    onChange={(e) => handleImageSelect(e.target.files[0])}
                    accept="image/*"
                    hidden
                  />
                </label>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="preview-image"
                  />
                )}
                {imageUrl && !previewUrl && (
                  <img
                    src={`${getApiUrl()}${imageUrl}`}
                    alt="current"
                    className="preview-image"
                  />
                )}
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

export default ManageBooks;

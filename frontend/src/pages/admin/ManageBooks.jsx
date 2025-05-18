import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MdLibraryBooks } from 'react-icons/md';
import './ManageBooks.css';
import { getApiUrl } from '../../utils/apiUtils';

const ManageBooks = () => {
  const initialValues = {
    title: '',
    isbn: '',
    author: '',
    category: '',
    publishYear: '',
    price: '',  // Changed from 0 to empty string
    quantity: '',  // Changed from 0 to empty string
    description: '',
    image: ''
  };

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState(initialValues);

  // Add new state for image preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

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
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (data) => {
    if (!data.title?.trim()) {
      alert('Vui lòng nhập tên sách');
      return false;
    }
    if (!data.isbn?.trim()) {
      alert('Vui lòng nhập ISBN');
      return false;
    }
    if (!data.author?.trim()) {
      alert('Vui lòng nhập tên tác giả');
      return false;
    }
    if (!data.category?.trim()) {
      alert('Vui lòng nhập thể loại');
      return false;
    }
    if (!data.publishYear || data.publishYear < 1900) {
      alert('Năm xuất bản không hợp lệ');
      return false;
    }
    if (!data.price || data.price <= 0) {
      alert('Giá tiền không hợp lệ');
      return false;
    }
    if (!data.quantity || data.quantity < 0) {
      alert('Số lượng không hợp lệ');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    try {
      // Upload image first if there's a new file selected
      let uploadedImageUrl = imageUrl;
      const token = localStorage.getItem('token');
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const uploadResponse = await fetch(`${getApiUrl()}/api/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData
        });

        if (!uploadResponse.ok) {
          throw new Error('Tải ảnh lên thất bại');
        }
        const uploadData = await uploadResponse.json();
        uploadedImageUrl = uploadData.url;
      }

      // Then submit the form with the image URL
      const response = await fetch(
        `${getApiUrl()}/api/books${editingId ? `/${editingId}` : ''}`,
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, image: uploadedImageUrl })
        }
      );
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      alert(`${editingId ? 'Cập nhật' : 'Thêm'} sách thành công`);
      setIsModalVisible(false);
      setFormData(initialValues);
      setImageUrl('');
      setSelectedFile(null);
      setPreviewUrl('');
      setEditingId(null);
      fetchBooks();
    } catch (error) {
      alert(error.message || 'Có lỗi xảy ra');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' || name === 'publishYear' 
        ? Number(value) 
        : value
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${getApiUrl()}/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      alert('Xóa sách thành công');
      fetchBooks();
    } catch (error) {
      alert(error.message || 'Xóa sách thất bại');
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
      description: book.description || ''
    });
    setImageUrl(book.image || '');
    setIsModalVisible(true);
  };

  const handleImageSelect = (file) => {
    if (file) {
      setSelectedFile(file);
      // Create local preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const columns = [
    { id: 'title', label: 'Title' },
    { id: 'isbn', label: 'ISBN' },
    { id: 'author', label: 'Author' },
    { id: 'category', label: 'Category' },
    { id: 'publishYear', label: 'Year' },
    { id: 'price', label: 'Price' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'image', label: 'Image' },
    { id: 'actions', label: 'Actions' }
  ];

  return (
    <div className="manage-books">
      <div className="header">
        <MdLibraryBooks size={24} />
        <h2>Book Management</h2>
      </div>

      <button className="btn btn-primary" onClick={() => setIsModalVisible(true)}>
        <FontAwesomeIcon icon={faPlus} /> Add Book
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>ISBN</th>
              <th>Author</th>
              <th>Category</th>
              <th>Year</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Actions</th>
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
                  {book.image &&
                  <img 
                    src={`${getApiUrl()}${book.image}`} 
                    alt={book.title} 
                    onClick={() => window.open(`${getApiUrl()}${book.image}`, '_blank')}
                    style={{ cursor: 'pointer' }}
                  />}
                </td>
                <td className="actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(book)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(book._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingId ? 'Edit Book' : 'Add Book'}</h3>
              <button className="close-btn" onClick={() => setIsModalVisible(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  name="publishYear"
                  value={formData.publishYear}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
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
              <div className="form-group">
                <label>Quantity</label>
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
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label className="upload-label">
                  <FontAwesomeIcon icon={faUpload} /> Upload Image
                  <input
                    type="file"
                    onChange={(e) => handleImageSelect(e.target.files[0])}
                    accept="image/*"
                    hidden
                  />
                </label>
                {previewUrl && <img src={previewUrl} alt="preview" className="preview-image" />}
                {imageUrl && !previewUrl && <img src={`${getApiUrl()}${imageUrl}`} alt="current" className="preview-image" />}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn" onClick={() => setIsModalVisible(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update' : 'Create'}
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

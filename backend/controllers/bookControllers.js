import Book from "../models/bookModel.js";
import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get all books
// @route   GET /api/books
export const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

// @desc    Search books by title or author
// @route   GET /api/books/search/book
export const searchBooks = asyncHandler(async (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ message: 'Thiếu query "q"' });
  }

  const books = await Book.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { author: { $regex: q, $options: "i" } },
    ],
  });

  const _books = books.map((book) => {
    const obj = book.toObject();
    return {
      ...obj,
      price: parseFloat(book.price?.toString() || "0"), // fallback nếu null
    };
  });

  res.json(_books);
});

// @desc    Search books by category
// @route   GET /api/books/search/category
export const searchByCategory = asyncHandler(async (req, res) => {
  const category = req.query.category;

  if (!category) {
    return res.status(400).json({ message: 'Thiếu query "category"' });
  }

  const books = await Book.find({
    category: { $regex: category, $options: "i" },
  });

  res.json(books);
});

// @desc    Add a new book
// @route   POST /api/books
export const addBook = asyncHandler(async (req, res) => {
  const {
    title,
    isbn,
    author,
    category,
    publishYear,
    price,
    quantity,
    description,
    image,
  } = req.body;

  const book = new Book({
    title,
    isbn,
    author,
    category,
    publishYear,
    price,
    quantity,
    description,
    image,
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

// @desc    Get all unique categories
// @route   GET /api/books/categories
// @desc    Get all unique categories
// @route   GET /api/books/categories
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Book.aggregate([
    {
      $group: {
        _id: "$category", // Group by the category field
        quantity: { $sum: 1 }, // Count the number of books in each category
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the result
        category: "$_id", // Rename _id to category
        quantity: 1, // Include the quantity field
      },
    },
    {
      $sort: {
        category: 1, // Sort categories alphabetically (optional)
      },
    },
  ]);

  res.json(categories);
});
const fetchCategories = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${getApiUrl()}/api/books/categories`); // Plural "books"
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    const categoriesWithDesc = data.map((cat, index) => ({
      ...cat,
      _id: cat.category, // Use category name as _id
      description: "",
    }));

    setCategories(categoriesWithDesc);
  } catch (error) {
    alert("Không thể tải danh mục sách");
  } finally {
    setLoading(false);
  }
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
      `${getApiUrl()}/api/books/categories${editingId ? `/${editingId}` : ""}`,
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

const handleDelete = async (id) => {
  if (!window.confirm("Bạn chắc chắn muốn xoá danh mục này?")) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${getApiUrl()}/api/books/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error((await response.json()).message);
    alert("Xóa danh mục thành công");
    fetchCategories();
  } catch (error) {
    alert(error.message || "Xoá thất bại");
  }
};
import express from "express";
// Adjust the import path

const router = express.Router();

router.delete(
  "/api/books/categories/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Book.deleteOne({ category: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }
    res.json({ message: "Xóa danh mục thành công" });
  })
);
router.put(
  "/api/books/categories/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { category } = req.body; // Ignore quantity since it's not in the schema

    const updatedCategory = await Book.updateMany(
      { category: id },
      { $set: { category } }
    );

    if (updatedCategory.matchedCount === 0) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }
    res.json({ message: "Cập nhật danh mục thành công" });
  })
);
// @desc    Get book by ID
// @route   GET /api/books/:id
export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Không tìm thấy sách" });
  }
});

// @desc    Update book
// @route   PUT /api/books/:id
export const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = req.body.title || book.title;
    book.isbn = req.body.isbn || book.isbn;
    book.author = req.body.author || book.author;
    book.category = req.body.category || book.category;
    book.publishYear = req.body.publishYear || book.publishYear;
    book.price = req.body.price || book.price;
    book.quantity = req.body.quantity || book.quantity;
    book.description = req.body.description || book.description;
    book.image = req.body.image || book.image;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: "Không tìm thấy sách" });
  }
});

// Add utility function to delete image
const deleteImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(__dirname, "..", imagePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
export const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    // Delete image file if exists
    if (book.image) {
      deleteImage(book.image);
    }

    await Book.deleteOne({ _id: book._id });
    res.json({ message: "Xóa sách thành công" });
  } else {
    res.status(404).json({ message: "Không tìm thấy sách" });
  }
});

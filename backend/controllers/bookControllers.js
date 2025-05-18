import Book from "../models/bookModel.js";
import asyncHandler from "express-async-handler";

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

    const _books = books.map(book => {
        const obj = book.toObject();
        return {
            ...obj,
            price: parseFloat(book.price?.toString() || '0'), // fallback nếu null
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
export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Book.distinct('category');
    res.json(categories);
});

// @desc    Get book by ID
// @route   GET /api/books/:id
export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Không tìm thấy sách' });
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
    res.status(404).json({ message: 'Không tìm thấy sách' });
  }
});

// @desc    Delete book
// @route   DELETE /api/books/:id
export const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await Book.deleteOne({ _id: book._id });
    res.json({ message: 'Xóa sách thành công' });
  } else {
    res.status(404).json({ message: 'Không tìm thấy sách' });
  }
});

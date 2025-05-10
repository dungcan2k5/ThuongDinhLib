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

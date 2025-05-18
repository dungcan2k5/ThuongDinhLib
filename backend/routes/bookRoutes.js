import express from "express";
import {
    getBooks,
    searchBooks,
    searchByCategory,
    addBook,
    getAllCategories,
    getBookById,
    updateBook,
    deleteBook
} from "../controllers/bookControllers.js";
import { protect } from '../middlewares/authStaff.js';

const router = express.Router();

// GET /api/books/
router.get("/", getBooks);
// POST /api/books
router.post("/", addBook);
// GET /api/books/search/book?q=keyword
router.get("/search/book", searchBooks);
// GET api/books/search/category?category=keyword
router.get("/search/category", searchByCategory);
// GET /api/books/categories
router.get("/categories", getAllCategories);
// Add these new routes
router.route('/:id')
    .get(getBookById)
    .put(protect, updateBook)
    .delete(protect, deleteBook);

export default router;

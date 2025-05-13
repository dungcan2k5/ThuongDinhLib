import express from "express";
import {
    getBooks,
    searchBooks,
    searchByCategory,
    addBook,
    getAllCategories
} from "../controllers/bookControllers.js";

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
export default router;

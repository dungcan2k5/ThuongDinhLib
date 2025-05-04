import express from "express";
import { getBooks, searchBooks, searchByCategory } from "../controllers/bookControllers.js";

const router = express.Router();

// GET /api/books/
router.get("/", getBooks);

// GET /api/books/search/book?q=keyword
router.get("/search/book", searchBooks);

// GET api/books/search/category?category=keyword
router.get("/search/category", searchByCategory);

export default router;

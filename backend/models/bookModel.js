import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    isbn: { type: String },
    author: { type: String },
    category: { type: String },
    publishYear: { type: Number },
    price: { type: mongoose.Decimal128 },
    quantity: { type: Number },
    description: { type: String },
    image: { type: String }, // link ảnh
  },
  {
    timestamps: true, // tự động tạo createdAt và updatedAt
  }
);

const Book = mongoose.model("Book", bookSchema, "books");

export default Book;

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Create images directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync(path.join(__dirname, 'images/books'))) {
  fs.mkdirSync(path.join(__dirname, '/books'));
}

// Serve images from images directory
app.use('/images/books', express.static(path.join(__dirname, 'images/books')));

// Database connection
connectDB();

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

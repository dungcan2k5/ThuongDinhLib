import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Convert ESM module path to dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configure multer storage
 * - Sets destination folder for uploads
 * - Generates unique filenames
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images/books"));
  },
  filename: (req, file, cb) => {
    // Generate unique filename using timestamp and random number
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

/**
 * File filter function
 * @param {Object} req - Express request object
 * @param {Object} file - Uploaded file object
 * @param {Function} cb - Callback function
 * Only allows image files to be uploaded
 */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Không phải file ảnh!"), false);
  }
};

/**
 * Multer middleware configuration
 * - Uses configured storage
 * - Applies file filter
 * - Sets file size limit to 5MB
 */
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { uploadImage } from '../controllers/uploadController.js';
import { protect } from '../middlewares/authStaff.js';

const router = express.Router();

router.post('/', protect, upload.single('file'), uploadImage);

export default router;

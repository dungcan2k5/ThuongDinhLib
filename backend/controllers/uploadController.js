import asyncHandler from 'express-async-handler';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file nào được tải lên' });
  }

  // Return the file path that can be stored in the database
  const filePath = '/images/books/' + req.file.filename;
  res.json({ url: filePath });
});

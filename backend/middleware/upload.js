import multer from "multer";

// Store the file in memory temporarily, not on disk -
// we're just passing it through to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;
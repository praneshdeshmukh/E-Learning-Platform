import path from "path";
import multer from "multer";
import fs from "fs";

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use absolute path for uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep original filename
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (![".jpg", ".jpeg", ".webp", ".png", ".mp4"].includes(ext)) {
    return cb(new Error(`Unsupported file type! ${ext}`), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max limit
  fileFilter,
});

export default upload;

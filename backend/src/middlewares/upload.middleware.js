// src/middlewares/upload.middleware.js
import multer from "multer";
import path from "path";

// 📦 Dùng memory storage để lấy buffer upload lên ImgBB
const storage = multer.memoryStorage();

// 🛑 filter file (chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const isValid =
    allowedTypes.test(file.mimetype) &&
    allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// 🚀 init multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// 🚀 Function Upload ảnh lên ImgBB
export const uploadToImgBB = async (fileBuffer) => {
  if (!fileBuffer) return null;
  
  const apiKey = process.env.IMGBB_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Lỗi: Thiếu IMGBB_API_KEY trong biến môi trường Render!");
  }

  const base64Image = fileBuffer.toString("base64");

  const formData = new URLSearchParams();
  formData.append("key", apiKey);
  formData.append("image", base64Image);

  try {
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.data.url; // URL ảnh từ ImgBB
    } else {
      throw new Error(data.error?.message || "Lỗi upload lên ImgBB");
    }
  } catch (error) {
    console.error("ImgBB Upload Error:", error.message);
    throw error;
  }
};
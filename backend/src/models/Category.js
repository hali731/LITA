// src/models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    // ảnh category (icon menu)
    image: String,

    // sắp xếp hiển thị
    sortOrder: {
      type: Number,
      default: 0,
    },

    // ẩn/hiện (ví dụ hết món nhóm đó)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
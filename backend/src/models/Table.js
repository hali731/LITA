// src/models/Table.js
import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    
    code: {
      type: String,
      unique: true,
    },

    qrCode: String, // link ảnh QR (nếu có)

    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Table", tableSchema);
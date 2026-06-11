// src/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    price: { type: Number, required: true },

    image: String,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    description: String,

    isAvailable: {
      type: Boolean,
      default: true,
    },

    soldCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
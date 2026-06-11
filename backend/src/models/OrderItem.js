// src/models/OrderItem.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  name: String,
  price: Number,
  quantity: Number,
});

export default orderItemSchema;
// src/models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    method: {
      type: String,
      enum: ["cash", "banking"],
      required: true,
    },

    amount: Number,

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "success",
    },

    provider: {
  type: String,
  enum: ["momo", "vnpay", "paypal", null],
  default: null,
},
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
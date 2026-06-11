// src/models/Order.js
import mongoose from "mongoose";
import orderItemSchema from "./OrderItem.js";

const orderSchema = new mongoose.Schema(
  {
    customer: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},

guestName: {
  type: String,
  default: null,
},

    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    source: {
  type: String,
  enum: ["staff", "qr", "app"],
  required: true,
},

    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    note: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
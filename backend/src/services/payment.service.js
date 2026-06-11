import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ===== CREATE PAYMENT =====
export const createPaymentService = async (data) => {
  const { orderId, method, provider } = data;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.paymentStatus === "paid") {
    throw new Error("Order already paid");
  }

  const payment = await Payment.create({
    order: order._id,
    method,
    provider,
    amount: order.totalAmount,
    status: "success",
  });

  // 👇 update order
  order.paymentStatus = "paid";
  order.status = "completed";

  await order.save();

  // sold count
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: {
        soldCount: item.quantity,
      },
    });
  }

  return payment;
};

// ===== GET ALL PAYMENTS =====
export const getPaymentsService = async () => {
  return await Payment.find()
    .populate("order")
    .sort({ createdAt: -1 });
};

// ===== GET BY ID =====
export const getPaymentByIdService = async (id) => {
  const payment = await Payment.findById(id).populate("order");
  if (!payment) throw new Error("Payment not found");

  return payment;
};
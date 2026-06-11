import {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  deleteOrderService,
} from "../services/order.service.js";

import Order from "../models/Order.js";

// ================= CREATE ORDER (UNIFIED) =================
export const createOrder = async (req, res) => {
  try {
    const order = await createOrderService({
      ...req.body,
      user: req.user || null,
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
// ================= GET ALL ORDERS =================
export const getOrders = async (req, res) => {
  try {
    const orders = await getOrdersService(req.query);

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET ORDER BY ID =================
export const getOrderById = async (req, res) => {
  try {
    const order = await getOrderByIdService(req.params.id);

    res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPDATE STATUS =================
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await updateOrderStatusService(
      req.params.id,
      req.body.status
    );

    res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE ORDER =================
export const deleteOrder = async (req, res) => {
  try {
    const result = await deleteOrderService(req.params.id);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= PAY ORDER =================
export const payOrder = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🔥 PAY ORDER DEBUG");
    console.log("ID:", id);

    const order = await Order.findById(id);

    if (!order) throw new Error("Order not found");

    console.log("✅ Order found:", order._id);

    await Order.updateOne(
      { _id: id },
      { $set: { paymentStatus: "paid" } }
    );

    const updated = await Order.findById(id);

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.log("❌ PAY ERROR:", err);

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user._id, // 👈 KEY QUAN TRỌNG
    })
      .populate("table")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
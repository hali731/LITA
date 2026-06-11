//backend/src/services/order.service.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Table from "../models/Table.js";

// ===== CREATE ORDER (QR / STAFF) =====
export const createOrderService = async ({
  items,
  table,
  guestName = null,
  note = "",
  source = "staff",
  user = null,
}) => {
  // ================= VALIDATION =================
  if (!["staff", "qr", "app"].includes(source)) {
    throw new Error("Invalid order source");
  }

  if (!items?.length) {
    throw new Error("Order items are required");
  }

  let tableDoc;

// ================= STAFF =================
if (source === "staff") {
  tableDoc = await Table.findById(table);
}

// ================= QR / APP =================
if (source === "qr" || source === "app") {
  tableDoc = await Table.findOne({ code: table });
}

// ================= VALIDATE =================
if (!tableDoc) throw new Error("Table not found");

  // ================= STAFF RULE =================
  if (source === "staff" && !guestName) {
    throw new Error("Guest name is required for staff order");
  }

  // ================= CUSTOMER RULE =================
  if (source === "app" && (!user || !user._id)) {
    throw new Error("Login required for app customer order");
  }

  // ================= CALCULATE =================
  let totalAmount = 0;
  const newItems = [];

for (const item of items) {
  const product = await Product.findById(item.product);

  if (!product) {
    throw new Error("Product not found");
  }

  if (!product.isAvailable) {
    throw new Error(`${product.name} is not available`);
  }

  const quantity = item.quantity;

  if (quantity <= 0) {
    throw new Error("Invalid quantity");
  }

  // 🔥 CHECK STOCK
  if (product.stockQuantity <= 0) {
    throw new Error(`${product.name} is out of stock`);
  }

  if (quantity > product.stockQuantity) {
    throw new Error(
      `${product.name} only has ${product.stockQuantity} left`
    );
  }

  // 🔥 TRỪ KHO
  product.stockQuantity -= quantity;

  // 🔥 AUTO HẾT HÀNG
  if (product.stockQuantity === 0) {
    product.isAvailable = false;
  }

  await product.save();

  totalAmount += product.price * quantity;

  newItems.push({
    product: product._id,
    name: product.name,
    price: product.price,
    quantity,
  });
}

  // ================= BUILD ORDER =================
  const orderData = {
  table: tableDoc._id,
  items: newItems,
  totalAmount,
  note,
  source,
  createdBy: user?._id || null,
};

  // STAFF → guestName
  if (source === "staff") {
    orderData.customer = null;
    orderData.guestName = guestName;
  }

  // QR / APP → customer ObjectId
  if (source === "qr" || source === "app") {
    orderData.customer = user?._id || null;
    orderData.guestName = null;
  }

  const order = await Order.create(orderData);

  // ================= TABLE STATUS =================
  if (source === "qr" || source === "app") {
    tableDoc.status = "occupied";
    await tableDoc.save();
  }
  console.log("USER IN SERVICE:", user);
console.log("SOURCE:", source);
console.log("TABLE INPUT:", table);
console.log("TABLE FOUND:", tableDoc?._id);

  return Order.findById(order._id)
    .populate("table")
    .populate("createdBy", "name")
    .populate("customer", "name email")
    .populate("items.product", "name price image");
};

// ===== GET ALL ORDERS =====
export const getOrdersService = async (query) => {
  const { status, paymentStatus } = query;

  let filter = {};

  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;

  return await Order.find(filter)
    .populate("table")
    .populate( "customer", "name")
    .sort({ createdAt: -1 });
};

// ===== GET ORDER DETAIL =====
export const getOrderByIdService = async (id) => {
  const order = await Order.findById(id)
    .populate("table")
    .populate("createdBy", "name")
    .populate("items.product", "name price image");

  if (!order) throw new Error("Order not found");

  return order;
};

// ===== UPDATE STATUS =====
export const updateOrderStatusService = async (id, status) => {
  const validStatus = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "completed",
    "cancelled",
  ];

  if (!validStatus.includes(status)) {
    throw new Error("Invalid status");
  }

  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  // 🔥 CHỈ HOÀN 1 LẦN
  if (status === "cancelled" && order.status !== "cancelled") {
    for (const item of order.items) {
      const product = await Product.findById(item.product);

      if (product) {
        product.stockQuantity += item.quantity;

        if (product.stockQuantity > 0) {
          product.isAvailable = true;
        }

        await product.save();
      }
    }
  }

  order.status = status;

  await order.save();

  return order;
};

// ===== DELETE ORDER =====
export const deleteOrderService = async (id) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  // 🔥 HOÀN STOCK
  for (const item of order.items) {
    const product = await Product.findById(item.product);

    if (product) {
      product.stockQuantity += item.quantity;

      if (product.stockQuantity > 0) {
        product.isAvailable = true;
      }

      await product.save();
    }
  }

  await Order.findByIdAndDelete(id);

  const table = await Table.findById(order.table);

  if (table) {
    table.status = "available";
    await table.save();
  }

  return {
    message: "Order deleted",
  };
};
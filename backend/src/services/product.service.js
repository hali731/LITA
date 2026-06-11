// backend/src/services/product.service.js
import Product from "../models/Product.js";
import Category from "../models/Category.js";

// ===== PUBLIC (MENU / QR) =====

// GET MENU (có filter + search)
export const getProductsService = async (query, isAdmin = false) => {
  const { keyword, category } = query;

  let filter = {};

  // ❗ CHỈ customer mới filter
  if (!isAdmin) {
    filter.isAvailable = true;
  }

  if (keyword) {
    filter.name = { $regex: keyword, $options: "i" };
  }

  if (category && category !== "all") {
    filter.category = category;
  }

  return await Product.find(filter)
    .populate("category", "name")
    .sort({ createdAt: -1 });
};

// GET PRODUCT DETAIL
export const getProductByIdService = async (id) => {
  const product = await Product.findById(id).populate("category", "name");
  if (!product) throw new Error("Product not found");

  return product;
};

// ===== ADMIN =====

// CREATE
export const createProductService = async (data) => {
  const { name, price, category, stockQuantity, image } = data;

  let categoryDoc;

  // nếu gửi id
  if (category && category.length === 24) {
    categoryDoc = await Category.findById(category);
  } else {
    // nếu gửi text
    categoryDoc = await Category.findOne({ name: category });

    if (!categoryDoc) {
      categoryDoc = await Category.create({ name: category });
    }
  }

  const product = await Product.create({
    name,
    price,
    stockQuantity,
    image,
    category: categoryDoc._id,
  });

  return await product.populate("category", "name");
};

// UPDATE
export const updateProductService = async (id, data) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  const { category, ...otherData } = data;

  if (category) {
    let categoryDoc;
    if (category.length === 24) {
      categoryDoc = await Category.findById(category);
    } else {
      categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        categoryDoc = await Category.create({ name: category });
      }
    }
    if (categoryDoc) {
      product.category = categoryDoc._id;
    }
  }

  Object.assign(product, otherData);

  // 🔥 AUTO AVAILABLE
  if (Number(product.stockQuantity) > 0) {
    product.isAvailable = true;
  }

  // 🔥 AUTO OUT OF STOCK
  if (Number(product.stockQuantity) === 0) {
    product.isAvailable = false;
  }

  await product.save();

  return product.populate("category", "name");
};

// DELETE
export const deleteProductService = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");

  return { message: "Product deleted" };
};

// TOGGLE AVAILABLE (ẩn/hiện món)
export const toggleProductService = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  product.isAvailable = !product.isAvailable;
  await product.save();

  return product;
};
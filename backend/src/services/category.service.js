// backend/src/services/category.service.js
import Category from "../models/Category.js";

// ===== PUBLIC (MENU / QR) =====
export const getCategoriesService = async () => {
  return await Category.find({ isActive: true }).sort({ sortOrder: 1 });
};

// ===== ADMIN =====

// GET ALL
export const getAllCategoriesService = async () => {
  return await Category.find().sort({ sortOrder: 1 });
};

// GET BY ID
export const getCategoryByIdService = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");
  return category;
};

// CREATE
export const createCategoryService = async (data) => {
  const existing = await Category.findOne({ name: data.name });
  if (existing) throw new Error("Category already exists");

  return await Category.create(data);
};

// UPDATE
export const updateCategoryService = async (id, data) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  Object.assign(category, data);
  await category.save();

  return category;
};

// DELETE
export const deleteCategoryService = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new Error("Category not found");

  return { message: "Category deleted" };
};

// TOGGLE ACTIVE
export const toggleCategoryService = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  category.isActive = !category.isActive;
  await category.save();

  return category;
};
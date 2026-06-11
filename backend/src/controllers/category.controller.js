// backend/src/controllers/category.controller.js
import {
  getCategoriesService,
  getAllCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
  toggleCategoryService,
} from "../services/category.service.js";

// ===== PUBLIC =====
export const getCategories = async (req, res) => {
  try {
    const data = await getCategoriesService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ===== ADMIN =====
export const getAllCategories = async (req, res) => {
  try {
    const data = await getAllCategoriesService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const data = await getCategoryByIdService(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const data = await createCategoryService(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const data = await updateCategoryService(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const result = await deleteCategoryService(req.params.id);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const toggleCategory = async (req, res) => {
  try {
    const data = await toggleCategoryService(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
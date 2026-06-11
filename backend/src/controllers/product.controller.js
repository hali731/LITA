// backend/src/controllers/product.controller.js
import {
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  toggleProductService,
} from "../services/product.service.js";

// ===== PUBLIC =====

// GET MENU
export const getProducts = async (req, res) => {
  try {
    const products = await getProductsService(req.query);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// controller
export const getProductsAdmin = async (req, res) => {
  try {
    const products = await getProductsService(req.query, true);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET DETAIL
export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== ADMIN =====

// CREATE
export const createProduct = async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.file ? req.file.filename : null,
    };

    const product = await createProductService(data);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.file) {
      data.image = req.file.filename;
    }

    const product = await updateProductService(
      req.params.id,
      data
    );

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const result = await deleteProductService(req.params.id);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// TOGGLE AVAILABLE
export const toggleProduct = async (req, res) => {
  try {
    const product = await toggleProductService(req.params.id);

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
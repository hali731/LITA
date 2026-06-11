import {
  getTablesService,
  getTableByIdService,
  createTableService,
  updateTableService,
  deleteTableService,
  updateTableStatusService,
  getTableByCodeService,
} from "../services/table.service.js";
import Table from "../models/Table.js";

// ===== PUBLIC (QR) =====
export const getTableByCode = async (req, res) => {
  try {
    const table = await getTableByCodeService(req.params.code);

    res.json({
      success: true,
      data: table,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTablesPublic = async (req, res) => {
  try {
    const tables = await Table.find({}); // hoặc status available

    res.json({
      success: true,
      data: tables,
    });
  } catch (error) {
    console.log("PUBLIC TABLE ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== ADMIN =====
export const getTables = async (req, res) => {
  try {
    const tables = await getTablesService();

    res.json({
      success: true,
      data: tables,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTableById = async (req, res) => {
  try {
    const table = await getTableByIdService(req.params.id);

    res.json({
      success: true,
      data: table,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const createTable = async (req, res) => {
  try {
    const table = await createTableService(req.body);

    res.status(201).json({
      success: true,
      data: table,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTable = async (req, res) => {
  try {
    const table = await updateTableService(req.params.id, req.body);

    res.json({
      success: true,
      data: table,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTable = async (req, res) => {
  try {
    const result = await deleteTableService(req.params.id);

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

export const updateTableStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const table = await updateTableStatusService(
      req.params.id,
      status
    );

    res.json({
      success: true,
      data: table,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
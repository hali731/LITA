import Table from "../models/Table.js";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import { ENV } from "../config/env.js";
// ===== PUBLIC (QR) =====
export const getTableByCodeService = async (code) => {
  const table = await Table.findOne({ code });
  if (!table) throw new Error("Table not found");
  return table;
};

// ===== ADMIN =====

// GET ALL
export const getTablesService = async () => {
  return await Table.find().sort({ createdAt: -1 });
};

// GET BY ID
export const getTableByIdService = async (id) => {
  const table = await Table.findById(id);
  if (!table) throw new Error("Table not found");
  return table;
};

// CREATE
export const createTableService = async (data) => {
  const code = uuidv4();

  const url = `${ENV.CLIENT_URL}/menu?table=${code}`;
  const qrCode = await QRCode.toDataURL(url);

  const table = await Table.create({
    name: data.name,        // chỉ nhận name
    status: "available",    // backend quyết định
    code,
    qrCode,
  });

  return table;
};

// UPDATE
export const updateTableService = async (id, data) => {
  const table = await Table.findById(id);
  if (!table) throw new Error("Table not found");

  Object.assign(table, data);
  await table.save();

  return table;
};

// DELETE
export const deleteTableService = async (id) => {
  const table = await Table.findByIdAndDelete(id);
  if (!table) throw new Error("Table not found");

  return { message: "Table deleted" };
};

// UPDATE STATUS (occupied / available)
export const updateTableStatusService = async (id, status) => {
  const table = await Table.findById(id);
  if (!table) throw new Error("Table not found");

  table.status = status;
  await table.save();

  return table;
};
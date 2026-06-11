// backend/src/controllers/payment.controller.js
import {
  createPaymentService,
  getPaymentsService,
  getPaymentByIdService,
} from "../services/payment.service.js";

// CREATE PAYMENT
export const createPayment = async (req, res) => {
  try {
    const payment = await createPaymentService(req.body);

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getPayments = async (req, res) => {
  try {
    const payments = await getPaymentsService();

    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET DETAIL
export const getPaymentById = async (req, res) => {
  try {
    const payment = await getPaymentByIdService(req.params.id);

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/config/db.js';
import User from './src/models/User.js';
import { createOrderService } from './src/services/order.service.js';

const run = async () => {
  await connectDB();
  
  try {
    const payload = {
      table: "0d932c8d-2230-49ff-9ac2-04193c6d066f",
      source: "qr",
      items: [
        {
          product: "69f7687dce75c77d205b9051", // Khoai tây chiên phô mai
          quantity: 1
        }
      ],
      note: ""
    };
    
    console.log("Creating QR order...");
    const order = await createOrderService(payload);
    console.log("Success:", order._id);
  } catch (err) {
    console.error("Error creating order:", err.message);
  }
  
  process.exit(0);
};

run();

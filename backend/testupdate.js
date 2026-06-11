import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/config/db.js';
import { updateProductService } from './src/services/product.service.js';

const run = async () => {
  await connectDB();
  
  try {
    // Try updating the product with ID 6a2af70b639cb6bcd8e4b7c9
    // Wait, let's just pick a product from the DB that exists.
    // Or try updating 69f762f2ce75c77d205b903a (Soda blue)
    console.log("Updating product...");
    const res = await updateProductService("69f762f2ce75c77d205b903a", {
      name: "Soda blue 2",
      price: "30000",
      category: "Nước",
      stockQuantity: "15"
    });
    console.log("Success:", JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("Error updating:", err);
  }

  process.exit(0);
};

run();

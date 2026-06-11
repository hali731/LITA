import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/config/db.js';
import Product from './src/models/Product.js';
import Category from './src/models/Category.js';

const run = async () => {
  await connectDB();
  const products = await Product.find().populate('category', 'name');
  console.log("PRODUCTS:", JSON.stringify(products, null, 2));

  const categories = await Category.find();
  console.log("CATEGORIES:", JSON.stringify(categories, null, 2));
  process.exit(0);
};

run().catch(console.error);

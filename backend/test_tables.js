import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/config/db.js';
import Table from './src/models/Table.js';
import Order from './src/models/Order.js';

const run = async () => {
  await connectDB();
  const tables = await Table.find({});
  console.log("TABLES:", tables);
  
  process.exit(0);
};

run();

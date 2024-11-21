import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const URL = process.env.MONGO_URI;
export async function db() {
  try {
    await mongoose.connect(URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
}

export default db;

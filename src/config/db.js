import mongoose from "mongoose";
import { config } from "dotenv";

config();

const url = process.env.DB_URL; // Connection URL
const db = "gtu-circular"; // DB name

export const connectDb = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(`${url}/${db}`, { useNewUrlParser: true });
  console.log("[INFO] Connected successfully to DB.");
};

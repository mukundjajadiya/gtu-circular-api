const mongoose = require("mongoose");
const { config } = require("dotenv");

config();

const url = process.env.DB_URL; // Connection URL
const db = "gtu-circular"; // DB name

const connectDb = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(`${url}/${db}`, { useNewUrlParser: true });
  console.log("[INFO] Connected successfully to DB.");
};

module.exports = { connectDb };

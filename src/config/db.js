const { MongoClient } = require("mongodb");
const { config } = require("dotenv");

config();
// Connection URL
const url = process.env.DB_URL;
const client = new MongoClient(url);
const dbName = "gtu-circular";

async function connectDb() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("[INFO] Connected successfully to DB");
  return client.db(dbName);
}

const getDb = async () => await connectDb();

module.exports = {
  connectDb,
  getDb,
};

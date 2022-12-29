const { MongoClient } = require("mongodb");
const { config } = require("dotenv");

config();
// Connection URL
const url = process.env.DB_URL;
const client = new MongoClient(url);
const dbName = "gtu-circular";
let db;
async function connectDb() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("[INFO] Connected successfully to DB");
  db = client.db(dbName);
}

const getDb = async () => db;

module.exports = {
  connectDb,
  getDb,
};

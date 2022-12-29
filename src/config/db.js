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
  const collection = db.collection("circulars");
  return collection;
}

const getCollection = (name) => {
  return db.collection(name);
};

module.exports = {
  connectDb,
  getCollection,
};

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const circularRoutes = require("./routes/circular.route");
const { scrapeCircular } = require("./utils/scrapeCircular");
const { connectDb } = require("./config/db");
const { formateDate } = require("./utils/formateDate");

const app = express();

// circular scraper interval in minutes
const SET_INTERVAL_TIME_IN_MIN = 5;

// api req rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 10, // max req allow in 1 min
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    success: false,
    type: "error",
    message: "Too many requests, please try again after some time.",
  },
});

// scraper interval call
setInterval(async () => {
  await scrapeCircular();
}, SET_INTERVAL_TIME_IN_MIN * 60 * 1000);

// middleware
app.use(cors());
app.use(limiter);

// api req middleware
app.use("/api/v1/circulars", circularRoutes);
app.use("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is running...",
  });
});



// server init
app.listen(process.env.PORT || "5000", async () => {
  console.log(`[INFO] ${await formateDate()} Server is running on 5000`);
  await connectDb();
  await scrapeCircular();
});

module.exports = app;

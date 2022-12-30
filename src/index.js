import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";
import circularRoutes from "./routes/circular.route.js";
import { scrapeCircular } from "./utils/scrapeCircular.js";
import { connectDb } from "./config/db.js";
import { formateDate } from "./utils/formateDate.js";

const app = express();

// circular scraper interval in minutes
const SET_INTERVAL_TIME_IN_MIN = 5;

// api req rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 5, // max req allow in 1 min
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
app.use(compression());
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
app.listen("5000", async () => {
  console.log(`[INFO] ${await formateDate()} Server is running on 5000`);
  await connectDb();
  await scrapeCircular();
});

export default app;

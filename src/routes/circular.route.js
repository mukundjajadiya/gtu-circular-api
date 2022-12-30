import { Router } from "express";
import {
  getAllCircular,
  getCircular,
} from "../controller/circular.controller.js";

const router = Router();
// handle today circular route
router.get("/today", getCircular);

// handle today or provided date circulars route
router.get("/:date", getCircular);

// handle all circulars route
router.get("/", getAllCircular);

export default router;

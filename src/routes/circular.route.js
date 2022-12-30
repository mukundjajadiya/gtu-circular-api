const {Router} = require("express");
const {
  getAllCircular,
  getCircular,
} = require("../controller/circular.controller");

const router = Router();
// handle today circular route
router.get("/today", getCircular);

// handle today or provided date circulars route
router.get("/:date", getCircular);

// handle all circulars route
router.get("/", getAllCircular);

module.exports = router;

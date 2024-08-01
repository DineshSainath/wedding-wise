const express = require("express");
const router = express.Router();
const { getVendors } = require("../controllers/vendorController");
const auth = require("../middleware/auth");

router.get("/", auth, getVendors);

module.exports = router;

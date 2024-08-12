const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

// @route   GET api/vendors
// @desc    Get all vendors
// @access  Public
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/vendors/:category
// @desc    Get vendors by category
// @access  Public
router.get("/category/:category", async (req, res) => {
  try {
    const vendors = await Vendor.find({ category: req.params.category });
    res.json(vendors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

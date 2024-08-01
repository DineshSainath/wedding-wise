const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5 },
});

module.exports = mongoose.model("Vendor", vendorSchema);

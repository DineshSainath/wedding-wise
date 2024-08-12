const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  cost: {
    type: Number,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model("Vendor", VendorSchema);

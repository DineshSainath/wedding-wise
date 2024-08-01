const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  details: { type: String },
  services: [
    {
      name: String,
      category: String,
      cost: Number,
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);

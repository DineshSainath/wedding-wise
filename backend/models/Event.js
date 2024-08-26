const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  details: { type: String },
  budget: Number,
  services: [
    {
      id: Number,
      name: String,
      category: String,
      cost: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);

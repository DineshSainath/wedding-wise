const mongoose = require("mongoose");

const budgetItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

const budgetSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  totalBudget: { type: Number, default: 0 },
  items: [budgetItemSchema],
});

module.exports = mongoose.model("Budget", budgetSchema);

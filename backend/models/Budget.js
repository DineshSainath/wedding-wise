const mongoose = require("mongoose");

const BudgetItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const BudgetSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  totalBudget: {
    type: Number,
    default: 0,
  },
  items: [BudgetItemSchema],
});

module.exports = mongoose.model("Budget", BudgetSchema);
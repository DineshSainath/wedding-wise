const Budget = require("../models/Budget");

// Create a new budget
exports.createBudget = async (req, res) => {
  try {
    const { eventId, totalBudget, items } = req.body;
    const newBudget = new Budget({ eventId, totalBudget, items });
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating budget", error: error.message });
  }
};

// Get a budget by event ID
exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ eventId: req.params.eventId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json(budget);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching budget", error: error.message });
  }
};

// Update a budget
exports.updateBudget = async (req, res) => {
  try {
    const { totalBudget, items } = req.body;
    const updatedBudget = await Budget.findOneAndUpdate(
      { eventId: req.params.eventId },
      { totalBudget, items },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedBudget);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating budget", error: error.message });
  }
};

// Add an item to the budget
exports.addBudgetItem = async (req, res) => {
  try {
    const { eventId, item } = req.body;
    const budget = await Budget.findOne({ eventId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    budget.items.push(item);
    const updatedBudget = await budget.save();
    res.status(200).json(updatedBudget);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding budget item", error: error.message });
  }
};

// Delete a budget item
exports.deleteBudgetItem = async (req, res) => {
  try {
    const { eventId, itemId } = req.params;
    const budget = await Budget.findOne({ eventId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    budget.items = budget.items.filter(
      (item) => item._id.toString() !== itemId
    );
    const updatedBudget = await budget.save();
    res.status(200).json(updatedBudget);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting budget item", error: error.message });
  }
};

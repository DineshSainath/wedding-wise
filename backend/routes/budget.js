const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Budget = require("../models/Budget");
const Event = require("../models/Event");

// @route   GET api/budget/:eventId
// @desc    Get budget for an event
// @access  Private
router.get("/:eventId", auth, async (req, res) => {
  try {
    const budget = await Budget.findOne({ event: req.params.eventId });
    if (!budget) {
      return res.status(404).json({ msg: "Budget not found for this event" });
    }
    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/budget/:eventId
// @desc    Create or update budget for an event
// @access  Private
router.post(
  "/:eventId",
  [auth, [check("totalBudget", "Total budget is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { totalBudget } = req.body;

    try {
      let budget = await Budget.findOne({ event: req.params.eventId });

      if (budget) {
        // Update existing budget
        budget.totalBudget = totalBudget;
      } else {
        // Create new budget
        budget = new Budget({
          event: req.params.eventId,
          totalBudget,
        });
      }

      await budget.save();
      res.json(budget);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/budget/:eventId/item
// @desc    Add budget item
// @access  Private
router.post(
  "/:eventId/item",
  [
    auth,
    [
      check("category", "Category is required").not().isEmpty(),
      check("amount", "Amount is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category, amount } = req.body;

    try {
      let budget = await Budget.findOne({ event: req.params.eventId });

      if (!budget) {
        return res.status(404).json({ msg: "Budget not found for this event" });
      }

      budget.items.push({ category, amount });
      await budget.save();

      res.json(budget);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/budget/:eventId/item/:itemId
// @desc    Delete budget item
// @access  Private
router.delete("/:eventId/item/:itemId", auth, async (req, res) => {
  try {
    let budget = await Budget.findOne({ event: req.params.eventId });

    if (!budget) {
      return res.status(404).json({ msg: "Budget not found for this event" });
    }

    // Remove item
    budget.items = budget.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    await budget.save();
    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

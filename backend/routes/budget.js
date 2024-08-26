const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Budget = require("../models/Budget");
const Event = require("../models/Event");
const BudgetService = require("../services/BudgetService");
var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


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

    // try {
    //   let budget = await Budget.findOne({ event: req.params.eventId });

    //   if (budget) {
    //     // Update existing budget
    //     budget.totalBudget = totalBudget;
    //   } else {
    //     // Create new budget
    //     budget = new Budget({
    //       event: req.params.eventId,
    //       totalBudget,
    //     });
    //   }

    //   await budget.save();
    //   res.json(budget);
    // } catch (err) {
    //   console.error(err.message);
    //   res.status(500).send("Server Error");
    // }

    let budget = await BudgetService.createBudget(req.params.eventId, totalBudget);

    if(budget){
      res.status(200).json(budget);
    }else {
      res.status(500).json({msg: "Error creating budget"});

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
let eId = new ObjectId(req.params.eventId);
console.log('eId', eId);
    try {
      let budget = await Budget.findOne({ event:  eId });

      if (!budget) {
        return res.status(404).json({ msg: "Budget not found for this event" });
      }

      let isExistingItem = budget?.items?.find(item => item.category === category)
      console.log('isExistingItem', isExistingItem)
      if(isExistingItem) {
        console.log('isExistingItem', 'already added')
        res.status(204).send("Item is already added to the Event");
        return;
      }else {

      budget.items.push({ category, amount });
      await budget.save();
      let length = budget.items.length;
      res.json(budget.items[length-1]);
      }
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

    console.log('Budget', budget.items.length)
    // Remove item
    budget.items = budget.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    await budget.save();
    console.log('Budget last', budget.items.length)

    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put('/:eventId', auth, async (req, res) => {
  let eventId = req.params.eventId
  const { newBudget } = req.body;

  if (newBudget === undefined) {
    return res.status(400).json({ error: 'Event ID and new budget are required' });
  }

  try {
    // Update the Event collection
    await Event.findByIdAndUpdate(eventId, { budget: newBudget }, { new: true });

    // Update the Budget collection
    await Budget.findOneAndUpdate({ event: eventId }, { totalBudget: newBudget }, { new: true });

    res.status(200).json({ msg: 'Budget updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

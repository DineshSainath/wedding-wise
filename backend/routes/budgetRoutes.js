const express = require("express");
const router = express.Router();
const {
  createBudget,
  getBudget,
  updateBudget,
  addBudgetItem,
  deleteBudgetItem,
} = require("../controllers/budgetController");
const auth = require("../middleware/auth");

router.post("/", auth, createBudget);
router.get("/:eventId", auth, getBudget);
router.put("/:eventId", auth, updateBudget);
router.post("/add-item", auth, addBudgetItem);
router.delete("/:eventId/items/:itemId", auth, deleteBudgetItem);

module.exports = router;

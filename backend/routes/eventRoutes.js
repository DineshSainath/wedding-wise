const express = require("express");
const router = express.Router();
const path = require("path");

// Import controller functions
const eventController = require(path.join(
  __dirname,
  "../controllers/eventController"
));

// Check if functions are defined and log their status
const functions = [
  "createEvent",
  "getEvents",
  "getEventById",
  "updateEvent",
  "deleteEvent",
  "addServiceToEvent",
];
functions.forEach((func) => {
  if (typeof eventController[func] !== "function") {
    console.error(`Warning: ${func} is not a function in eventController`);
  }
});

// Destructure with default values to prevent undefined errors
const {
  createEvent = (req, res) =>
    res.status(501).json({ message: "createEvent not implemented" }),
  getEvents = (req, res) =>
    res.status(501).json({ message: "getEvents not implemented" }),
  getEventById = (req, res) =>
    res.status(501).json({ message: "getEventById not implemented" }),
  updateEvent = (req, res) =>
    res.status(501).json({ message: "updateEvent not implemented" }),
  deleteEvent = (req, res) =>
    res.status(501).json({ message: "deleteEvent not implemented" }),
  addServiceToEvent = (req, res) =>
    res.status(501).json({ message: "addServiceToEvent not implemented" }),
} = eventController;

const auth = require("../middleware/auth");

// Define routes
router.post("/", auth, createEvent);
router.get("/", auth, getEvents);
router.get("/:id", auth, getEventById);
router.put("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);
router.post("/add-service", auth, addServiceToEvent);

module.exports = router;

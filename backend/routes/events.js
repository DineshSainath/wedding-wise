const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Event = require("../models/Event");

// @route   GET api/events
// @desc    Get all events for a user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/events
// @desc    Add new event
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("date", "Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, date, details } = req.body;

    try {
      const newEvent = new Event({
        name,
        date,
        details,
        user: req.user.id,
      });

      const event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/events/:id
// @desc    Update event
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { name, date, details } = req.body;

  // Build event object
  const eventFields = {};
  if (name) eventFields.name = name;
  if (date) eventFields.date = date;
  if (details) eventFields.details = details;

  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: "Event not found" });

    // Make sure user owns event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/events/:id
// @desc    Delete event
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: "Event not found" });

    // Make sure user owns event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Event.deleteOne({ _id: req.params.id });
    console.log("Event successfully deleted");

    res.json({ msg: "Event removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/events/:id/services
// @desc    Add a service to an event
// @access  Private
router.post(
  "/:id/services",
  [
    auth,
    [
      check("id", "Service ID is required").not().isEmpty(),
      check("name", "Service name is required").not().isEmpty(),
      check("category", "Service category is required").not().isEmpty(),
      check("cost", "Service cost is required").isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ msg: "Event not found" });
      }

      // Make sure user owns event
      if (event.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      const { id, name, category, cost } = req.body;
      const newService = { id, name, category, cost };

      // Check if service already exists in the event
      const serviceExists = event.services.some((service) => service.id === id);
      if (serviceExists) {
        return res
          .status(400)
          .json({ msg: "Service already added to this event" });
      }

      event.services.push(newService);
      await event.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/events/:id/services/:serviceId
// @desc    Remove a service from an event
// @access  Private
router.delete("/:id/services/:serviceId", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Make sure user owns event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Remove the service
    event.services = event.services.filter(
      (service) => service.id !== parseInt(req.params.serviceId)
    );

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

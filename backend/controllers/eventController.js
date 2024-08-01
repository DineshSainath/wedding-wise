const Event = require("../models/Event");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { name, date, details } = req.body;
    const newEvent = new Event({ name, date, details });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating event", error: error.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching events", error: error.message });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching event", error: error.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating event", error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting event", error: error.message });
  }
};

// Add a service to an event
exports.addServiceToEvent = async (req, res) => {
  try {
    const { eventId, service } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.services.push(service);
    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding service to event", error: error.message });
  }
};

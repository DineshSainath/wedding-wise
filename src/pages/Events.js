import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../redux/actions/eventActions";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Tabs,
  Tab,
  Alert,
} from "react-bootstrap";
import EventCard from "../components/EventCard";

function Events() {
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    details: "",
    budget: "",
  });
  const [activeTab, setActiveTab] = useState("add");
  const [alert, setAlert] = useState(null);

  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching events...");
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    console.log("Events updated:", events);
  }, [events]);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    console.log("Adding new event:", newEvent);

    const formattedEvent = {
      ...newEvent,
      budget: {
        totalBudget: parseFloat(newEvent.budget) || 0,
        items: [],
      },
    };

    console.log("Formatted event data:", formattedEvent);

    const success = await dispatch(addEvent(formattedEvent));

    if (success) {
      console.log("Event added successfully");
      setNewEvent({ name: "", date: "", details: "", budget: "" });
      setActiveTab("list");
      setAlert({ type: "success", message: "Event added successfully!" });
    } else {
      console.log("Failed to add event");
      setAlert({
        type: "danger",
        message: "Failed to add event. Please try again.",
      });
    }
  };

  const handleUpdateEvent = (updatedEvent) => {
    console.log("Updating event:", updatedEvent);
    dispatch(updateEvent(updatedEvent.id, updatedEvent));
  };

  const handleDeleteEvent = (eventId) => {
    console.log("Deleting event:", eventId);
    dispatch(deleteEvent(eventId));
  };

  console.log("Rendering Events component. Current events:", events);

  return (
    <Container>
      <h2 className="mb-3">Events</h2>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        id="events-tabs"
      >
        <Tab eventKey="add" title="Add an Event">
          <Form onSubmit={handleAddEvent} className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Budget</Form.Label>
                  <Form.Control
                    type="number"
                    value={newEvent.budget}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, budget: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.details}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, details: e.target.value })
                }
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Event
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="list" title="Event List">
          <Row className="mt-3">
            {events.map((event) => (
              <Col md={6} lg={4} key={event.id}>
                <EventCard
                  event={event}
                  onUpdate={handleUpdateEvent}
                  onDelete={handleDeleteEvent}
                />
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Events;

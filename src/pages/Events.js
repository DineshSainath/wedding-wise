import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addEvent,
  updateEvent,
  deleteEvent,
} from "../redux/actions/eventActions";
import { setEventTotalBudget } from "../redux/actions/budgetActions";
import { Container, Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";
import EventCard from "../components/EventCard";

function Events() {
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    details: "",
    budget: "",
  });
  const [activeTab, setActiveTab] = useState("add");

  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  const handleAddEvent = (e) => {
    e.preventDefault();
    const eventId = Date.now();
    dispatch(addEvent({ ...newEvent, id: eventId }));
    dispatch(setEventTotalBudget(eventId, Number(newEvent.budget)));
    setNewEvent({ name: "", date: "", details: "", budget: "" });
    setActiveTab("list"); // Switch to the event list tab
  };

  const handleUpdateEvent = (updatedEvent) => {
    dispatch(updateEvent(updatedEvent));
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return (
    <Container>
      <h2 className="mb-3">Events</h2>
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

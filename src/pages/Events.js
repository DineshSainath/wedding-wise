import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../redux/actions/eventActions";
import EventCard from "../components/EventCard";

function Events() {
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    details: "",
  });

  const events = useSelector((state) => state.events.events);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(getEvents());
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    dispatch(addEvent(newEvent));
    setNewEvent({ name: "", date: "", details: "" });
  };

  const handleUpdateEvent = (updatedEvent) => {
    dispatch(updateEvent(updatedEvent));
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <Container>
      <h2 className="mb-4">Events</h2>
      <Tabs defaultActiveKey="add" id="events-tabs">
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

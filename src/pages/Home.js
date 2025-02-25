import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import { addEvent } from "../redux/actions/eventActions";
import { setEventTotalBudget } from "../redux/actions/budgetActions";

function Home() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", details: "" });

  const packages = [
    { name: "Basic", price: 1000, description: "Essential wedding services" },
    {
      name: "Premium",
      price: 3000,
      description: "Comprehensive wedding package",
    },
    {
      name: "Luxury",
      price: 5000,
      description: "All-inclusive luxury wedding experience",
    },
  ];

  const handleAddToEventList = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleCreateEvent = () => {
    const eventId = Date.now();
    dispatch(addEvent({ ...newEvent, id: eventId }));
    dispatch(setEventTotalBudget(eventId, selectedPackage.price));
    setShowModal(false);
    setNewEvent({ name: "", date: "", details: "" });
  };

  return (
    <Container>
      <h1>Welcome to Wedding Planner</h1>
      <Row>
        {packages.map((pkg, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{pkg.name} Package</Card.Title>
                <Card.Text>{pkg.description}</Card.Text>
                <Card.Text>Price: ₹{pkg.price}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleAddToEventList(pkg)}
                >
                  Add to Event List
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateEvent}>
            Create Event
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Home;

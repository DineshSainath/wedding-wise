import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Button,
  Form,
  ListGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function EventCard({ event, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const eventBudget = useSelector((state) => {
    console.log("Full Redux State:", state);
    console.log("Event ID:", event.id);
    console.log(
      "Event Budget from Redux:",
      state.budget.eventBudgets[event.id]
    );
    console.log("Event Budget from props:", event.budget);
    return (
      state.budget.eventBudgets[event.id] ||
      event.budget || { totalBudget: 0, items: [] }
    );
  });

  console.log("Final Event Budget used:", eventBudget);

  const services = event.services || [];

  const totalBudget = eventBudget.totalBudget || 0;
  const totalExpenses = services.reduce(
    (sum, service) => sum + Number(service.cost),
    0
  );
  const remainingBudget = totalBudget - totalExpenses;
  const budgetProgress =
    totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

  const handleSave = () => {
    console.log("Saving edited event:", editedEvent);
    onUpdate(editedEvent);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // This will return 'YYYY-MM-DD'
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        {isEditing ? (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedEvent.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formatDate(editedEvent.date)}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                name="details"
                value={editedEvent.details}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Budget</Form.Label>
              <Form.Control
                type="number"
                name="budget"
                value={editedEvent.budget?.totalBudget || ""}
                onChange={(e) =>
                  setEditedEvent((prev) => ({
                    ...prev,
                    budget: {
                      ...prev.budget,
                      totalBudget: Number(e.target.value),
                    },
                  }))
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="me-2">
              Save
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Title>{event.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Date: {formatDate(event.date)}
            </Card.Subtitle>
            <Card.Text>{event.details}</Card.Text>
            <div className="mb-3">
              <small>Budget Progress:</small>
              <ProgressBar
                now={budgetProgress}
                label={`${budgetProgress.toFixed(2)}%`}
              />
              <small>Total Budget: ₹{totalBudget.toFixed(2)}</small>
              <br />
              <small>Remaining: ₹{remainingBudget.toFixed(2)}</small>
            </div>
            <Button
              variant="outline-primary"
              onClick={() => setIsEditing(true)}
              className="me-2"
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => onDelete(event.id)}
              className="me-2"
            >
              Delete
            </Button>
            <Button
              variant="outline-info"
              onClick={() => setShowDetailsModal(true)}
              className="me-2"
            >
              Details
            </Button>
            <Link
              to={`/budget/${event.id}`}
              className="btn btn-outline-success"
            >
              Manage Budget
            </Link>
          </>
        )}
      </Card.Body>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{event.name} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Date:</strong> {formatDate(event.date)}
          </p>
          <p>
            <strong>Details:</strong> {event.details}
          </p>
          <h5>Vendor Services</h5>
          <ListGroup>
            {services.map((service) => (
              <ListGroup.Item key={service.id}>
                {service.name} - {service.category} - ₹{service.cost}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Link
            to={`/vendors?eventId=${event.id}`}
            className="btn btn-primary mt-3"
          >
            Manage Vendors
          </Link>
        </Modal.Body>
      </Modal>
    </Card>
  );
}

export default EventCard;

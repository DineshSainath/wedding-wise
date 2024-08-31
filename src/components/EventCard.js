/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Button,
  Form,
  ListGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  setEventTotalBudget,
  addEventBudgetItem,
  removeAllEventItems,
} from "../redux/actions/budgetActions";

function EventCard({ event, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const dispatch = useDispatch();
  const eventBudget = useSelector(
    (state) =>
      state.budget.eventBudgets[event._id] || { totalBudget: 0, items: [] }
  );

  console.log("eventBudget", eventBudget);

  useEffect(() => {
    console.log("eventBudget called", event.budget);
    dispatch(setEventTotalBudget(event._id, Number(event.budget)));

    event?.budgets?.items?.forEach((item) => {
      dispatch(addEventBudgetItem(event._id, item));
    });
  }, [event]);

  // new code
  const services = eventBudget.items.map((item) => ({
    id: item.id,
    name: item.category.split(" - ")[1],
    category: item.category.split(" - ")[0],
    cost: item.amount,
  }));

  const totalExpenses = eventBudget.items
    ? eventBudget.items.reduce((sum, item) => sum + Number(item.amount), 0)
    : 0;
  const remainingBudget = eventBudget.totalBudget - totalExpenses;
  const budgetProgress =
    eventBudget.totalBudget > 0
      ? (totalExpenses / eventBudget.totalBudget) * 100
      : 0;

  console.log("eventBudget", eventBudget);

  const handleSave = () => {
    console.log(editedEvent);
    editedEvent.eventId = event._id;
    onUpdate(editedEvent);
    setIsEditing(false);
    // dispatch();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
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
                value={editedEvent.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Budget</Form.Label>
              <Form.Control
                type="number"
                name="budget"
                value={editedEvent.budget}
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
              Date: {event.date}
            </Card.Subtitle>
            <Card.Text>{event.details}</Card.Text>
            <div className="mb-3">
              <small>Budget Progress:</small>
              <ProgressBar
                now={budgetProgress}
                label={`${budgetProgress.toFixed(2)}%`}
              />
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
              onClick={() => onDelete(event._id)}
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
              to={`/budget/${event._id}`}
              className="manage-budget btn btn-outline-success"
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
            <strong>Date:</strong> {event.date}
          </p>
          <p>
            <strong>Details:</strong> {event.details}
          </p>
          <h5>Vendor Services</h5>
          <ListGroup>
            {services.map((service, index) => (
              <ListGroup.Item key={service.id}>
                {service.name} - {service.category} - ₹{service.cost}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Link
            to={`/vendors?eventId=${event._id}`}
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

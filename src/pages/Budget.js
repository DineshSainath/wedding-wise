import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  ProgressBar,
  Modal,
  Alert,
} from "react-bootstrap";
import {
  setEventTotalBudget,
  addEventBudgetItem,
  updateEventBudgetItem,
  deleteEventBudgetItem,
  getEventBudget,
} from "../redux/actions/budgetActions";

function Budget() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const event = useSelector((state) =>
    state.events.events.find((e) => e.id === parseInt(eventId))
  );
  const eventBudget = useSelector(
    (state) =>
      state.budget.eventBudgets[eventId] || { totalBudget: 0, items: [] }
  );
  const { totalBudget, items = [] } = eventBudget;

  const [newItem, setNewItem] = useState({ category: "", amount: "" });
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (eventId) {
      dispatch(getEventBudget(eventId));
    }
  }, [dispatch, eventId, isAuthenticated, navigate]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.category && newItem.amount) {
      dispatch(addEventBudgetItem(eventId, { ...newItem, id: Date.now() }));
      setNewItem({ category: "", amount: "" });
    }
  };

  const handleUpdateItem = () => {
    if (editingItem.category && editingItem.amount) {
      dispatch(updateEventBudgetItem(eventId, editingItem));
      setShowEditModal(false);
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteEventBudgetItem(eventId, id));
  };

  const totalExpenses = items.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );
  const remainingBudget = totalBudget - totalExpenses;
  const budgetProgress =
    totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

  const handleUpdateTotalBudget = (newBudget) => {
    dispatch(setEventTotalBudget(eventId, Number(newBudget)));
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  if (!event) {
    return (
      <Container>
        <Alert variant="danger">Event not found</Alert>
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Budget for {event.name}</h2>
      <Link to="/events" className="btn btn-secondary mb-3">
        Back to Events
      </Link>
      <Row>
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Total Budget</Card.Title>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={totalBudget}
                  onChange={(e) =>
                    handleUpdateTotalBudget(Number(e.target.value))
                  }
                />
              </Form.Group>
              <Card.Text>
                <strong>Remaining: ${remainingBudget.toFixed(2)}</strong>
              </Card.Text>
              <ProgressBar
                now={budgetProgress}
                label={`${budgetProgress.toFixed(2)}%`}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Card.Title>Add Budget Item</Card.Title>
              <Form onSubmit={handleAddItem}>
                <Row>
                  <Col md={5}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Category"
                        value={newItem.category}
                        onChange={(e) =>
                          setNewItem({ ...newItem, category: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="Amount"
                        value={newItem.amount}
                        onChange={(e) =>
                          setNewItem({ ...newItem, amount: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Button type="submit" variant="primary" className="w-100">
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Budget Items</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.category}</td>
                      <td>${Number(item.amount).toFixed(2)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setEditingItem(item);
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Budget Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={editingItem?.category || ""}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, category: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={editingItem?.amount || ""}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, amount: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Budget;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  ProgressBar,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  fetchBudget,
  addBudgetItem,
  updateBudgetItem,
  deleteBudgetItem,
} from "../redux/actions/budgetActions";

function Budget() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) =>
    state.events.events.find((e) => e.id === parseInt(eventId))
  );
  const budget = useSelector((state) => state.budget.eventBudgets?.[eventId]);
  const [newItem, setNewItem] = useState({ category: "", amount: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBudget = async () => {
      try {
        setLoading(true);
        await dispatch(fetchBudget(eventId));
        setLoading(false);
      } catch (err) {
        setError("Failed to load budget. Please try again.");
        setLoading(false);
      }
    };

    if (eventId) {
      loadBudget();
    }
  }, [eventId, dispatch]);

  const handleAddItem = (e) => {
    e.preventDefault();
    dispatch(addBudgetItem(eventId, newItem));
    setNewItem({ category: "", amount: "" });
  };

  const handleUpdateItem = (itemId, updatedItem) => {
    dispatch(updateBudgetItem(eventId, itemId, updatedItem));
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteBudgetItem(eventId, itemId));
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </Container>
    );
  }

  if (!event || !budget) {
    return (
      <Container>
        <Alert variant="warning">Event or budget not found.</Alert>
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </Container>
    );
  }

  const totalBudget = budget.totalBudget || 0;
  const totalExpenses = budget.items
    ? budget.items.reduce((sum, item) => sum + Number(item.amount), 0)
    : 0;
  const remainingBudget = totalBudget - totalExpenses;
  const budgetProgress =
    totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

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
                    dispatch(
                      updateBudgetItem(
                        eventId,
                        "totalBudget",
                        Number(e.target.value)
                      )
                    )
                  }
                />
              </Form.Group>
              <Card.Text>
                <strong>Remaining: ₹{remainingBudget.toFixed(2)}</strong>
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
                        required
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
                        required
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
                  {budget.items &&
                    budget.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.category}</td>
                        <td>₹{Number(item.amount).toFixed(2)}</td>
                        <td>
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
    </Container>
  );
}

export default Budget;

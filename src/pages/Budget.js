import React, { useState } from "react";
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
  Alert,
} from "react-bootstrap";
import {
  setEventTotalBudget,
  addEventBudgetItem,
  deleteEventBudgetItem,
} from "../redux/actions/budgetActions";

function Budget() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const event = useSelector((state) =>
    state.events.events.find((e) => e.id === parseInt(eventId))
  );
  const eventBudget = useSelector(
    (state) =>
      state.budget.eventBudgets[eventId] || { totalBudget: 0, items: [] }
  );
  const { totalBudget, items = [] } = eventBudget;

  const [newItem, setNewItem] = useState({ category: "", amount: "" });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.category && newItem.amount) {
      const itemToAdd = {
        ...newItem,
        id: `item_${Date.now()}`,
        amount: Number(newItem.amount),
      };
      dispatch(addEventBudgetItem(eventId, itemToAdd));
      setNewItem({ category: "", amount: "" });
    }
  };

  const handleDeleteItem = (itemId) => {
    if (itemId) {
      dispatch(deleteEventBudgetItem(eventId, itemId));
    } else {
      console.error("Attempted to delete item with undefined ID");
    }
  };

  const handleEditItem = (item) => {
    const category = item.category.split(" - ")[0];
    navigate(`/vendors/${category}?eventId=${eventId}`);
  };

  const totalExpenses = items.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );
  const remainingBudget = totalBudget - totalExpenses;
  const budgetProgress =
    totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

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
                    dispatch(
                      setEventTotalBudget(eventId, Number(e.target.value))
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
                      <td>₹{Number(item.amount).toFixed(2)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditItem(item)}
                          className="me-2"
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
    </Container>
  );
}

export default Budget;

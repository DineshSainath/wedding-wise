/* eslint-disable */
import React, { useEffect, useState } from "react";
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
import axios from "axios";
function Budget() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [event, setEvent] = useState(useSelector((state) =>
  //   state.events.events.find((e) => e._id === eventId)
  // ))

  // const [eventBudget, setEventBudget] = useState(useSelector((state) =>
  //   state.events.events.find((e) => e._id === eventId)
  // ))

  // useEffect(() => {
  //   console.log('useEffect() called')
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/events/${eventId}`, {
  //         headers: {
  //           "x-auth-token": token,
  //         },
  //       });

  //       if (response.status === 200) {
  //         let data = response.data
  //         console.log(data.event);
  //         setEvent(data.event);
  //         setEventBudget(setEventBudget);
  //       } else {
  //         alert("Failed to fetch events:", response?.data?.msg);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //       alert("Error fetching events: " + error.message);
  //     }
  //   }

  //   fetchEvents();
  // })

  const event = useSelector((state) =>
    state.events.events.find((e) => e._id === eventId)
  );
  const eventBudget = useSelector(
    (state) =>
      state.budget.eventBudgets[eventId] || { totalBudget: 0, items: [] }
  );
  const { totalBudget, items = [] } = eventBudget;

  const [newItem, setNewItem] = useState({ category: "", amount: "" });
  const [newBudget, setNewBudget] = useState(eventBudget?.totalBudget);
  const token = useSelector((state) => state.auth.token);

  const handleAddItem = async (e) => {
    console.log(newItem);
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/budget/${eventId}/item`,
        {
          category: newItem.category,
          amount: newItem.amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        dispatch(addEventBudgetItem(eventId, response.data));
        setNewItem({ category: "", amount: "" });

        // alert(response.data.msg)
        alert("Item added successfully");
        // setActiveTab("list");
      } else {
        alert("Failed to create event:", response?.data?.msg);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  // const handleAddItem = (e) => {
  //   e.preventDefault();
  //   if (newItem.category && newItem.amount) {
  //     const itemToAdd = {
  //       ...newItem,
  //       id: `item_${Date.now()}`,
  //       amount: Number(newItem.amount),
  //     };
  //     dispatch(addEventBudgetItem(eventId, itemToAdd));
  //     setNewItem({ category: "", amount: "" });
  //   }
  // };

  const handleDeleteItem = async (itemId) => {
    if (itemId) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/budget/${eventId}/item/${itemId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          console.log(response.data);

          dispatch(deleteEventBudgetItem(eventId, itemId));

          // alert(response.data.msg)
          // setActiveTab("list");
        } else {
          alert("Failed to create event:", response?.data?.msg);
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
      }
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

  // Function to update the budget in both collections
  const updateEventBudget = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/budget/${eventId}`,
        {
          newBudget,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Budget updated successfully");
        console.log("newBudget", newBudget);
        dispatch(setEventTotalBudget(eventId, Number(newBudget)));
      } else {
        alert("Failed to update budget:", response?.data?.msg);
      }
    } catch (error) {
      console.log(error);
      alert("Error updating budget: " + error.response.statusText);
    }
  };

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
                  value={newBudget}
                  onChange={(e) => {
                    setNewBudget(e.target.value);
                  }}
                />
              </Form.Group>
              <Card.Text>
                <strong>Remaining: ₹{remainingBudget.toFixed(2)}</strong>
              </Card.Text>
              <ProgressBar
                now={budgetProgress}
                label={`${budgetProgress.toFixed(2)}%`}
              />
              <Button className="" onClick={() => updateEventBudget()}>
                Save
              </Button>
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
                        {/* <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditItem(item)}
                          className="me-2"
                        >
                          Edit
                        </Button> */}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteItem(item._id)}
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

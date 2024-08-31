import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { updateEventBudget } from "../redux/actions/budgetActions";
import LandingCarousel from "../components/Carousel";
import "../styles/custom.css";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    details: "",
    budget: 0,
  });
  const token = useSelector((state) => state.auth.token);

  const packages = [
    {
      name: "Basic",
      price: 1000,
      description: "Essential wedding services",
      img: "https://i.pinimg.com/736x/b3/d0/b5/b3d0b5b47b98892c43b6dabb77fd76f3.jpg",
    },
    {
      name: "Premium",
      price: 3000,
      description: "Comprehensive wedding package",
      img: "https://i.pinimg.com/736x/d9/98/1f/d9981f2532fdc8374e4fed0c6f5c3256.jpg",
    },
    {
      name: "Luxury",
      price: 5000,
      description: "All-inclusive luxury wedding experience",
      img: "https://i.pinimg.com/736x/a9/71/c7/a971c76a6c64025f8f996bdf8ad8d7f7.jpg",
    },
  ];

  const handleAddToEventList = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleCreateEvent = async () => {
    console.log("token", token);
    try {
      const response = await axios.post(
        "https://wedding-wise-kphj.onrender.com/api/events",
        {
          name: newEvent.name,
          date: newEvent.date,
          details: newEvent.details,
          budget: newEvent.budget,
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
        const eventId = response.data._id; // Assuming the API returns the event ID
        dispatch(addEvent({ ...newEvent, id: eventId }));
        dispatch(updateEventBudget(eventId, selectedPackage.price));
        setShowModal(false);
        setNewEvent({ name: "", date: "", details: "" });
      } else {
        alert("Failed to create event:", response?.data?.msg);
      }
    } catch (error) {
      console.log(error);
      alert("Error creating event " + error.response.statusText);
    }
  };

  return (
    <Container>
      <LandingCarousel />

      <Row id="package" className="packages-section">
        <h2 className="package-heading"> PACKAGES </h2>
        {packages.map((pkg, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{pkg.name} Package</Card.Title>
                <Card.Img className="package-img" src={pkg.img} />
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
              <Form.Label>Budget</Form.Label>
              <Form.Control
                type="number"
                value={newEvent.budget}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, budget: e.target.value })
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

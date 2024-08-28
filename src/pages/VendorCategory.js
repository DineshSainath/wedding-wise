import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Toast,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateEventBudget } from "../redux/actions/budgetActions";
import { addServiceToEvent } from "../redux/actions/eventActions";
import { addEventBudgetItem } from "../redux/actions/budgetActions";
import { vendorData } from "./vendorData";
import axios from "axios";

function VendorCategory() {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventId");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const events = useSelector((state) => state.events.events);
  const currentEvent = useSelector((state) =>
    state.events.events.find((event) => event._id === parseInt(eventId))
  );
  const eventBudget = useSelector(
    (state) =>
      state.budget.eventBudgets[eventId] || { totalBudget: 0, items: [] }
  );

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (vendorData[category]) {
      setVendors(vendorData[category]);
    }
  }, [category]);

  const isVendorAdded = (vendor) => {
    if (!eventBudget || !eventBudget.items) return false;
    return eventBudget.items.some(
      (item) => item.category === `${category} - ${vendor.name}`
    );
  };

  const handleAddService = async (vendor) => {
    if (eventId) {
      const targetEvent = events.find((event) => event._id === eventId);
      if (targetEvent && isVendorAdded(vendor)) {
        setToastMessage(`${vendor.name} is already added to the event!`);
        setShowToast(true);
        setShowEventModal(false);
        return;
      }
      let item = {
        category: vendor.name,
        name: vendor.name,
        amount: vendor.cost,
        id: vendor.id,
      }
      console.log(item);
      try {
        const response = await axios.post(
          `http://localhost:5000/api/budget/${eventId}/item`,
          {
            category: item.category,
            amount: item.amount,
            id: item.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );
  
        console.log('status', response.status)
        if (response.status === 200 || response.status === 201) {
          console.log(response.data)
          dispatch(addServiceToEvent(eventId, item));
          dispatch(
            addEventBudgetItem(eventId, response.data)
          );
          setToastMessage(`${vendor.name} added to your event!`);
          setShowToast(true);
          setShowEventModal(false);
  
          // alert(response.data.msg)
          // setActiveTab("list");
        } else if (response.status === 204) {
          alert("Service is already added.");
        }else {
          alert("Failed to create event:",response?.data?.msg);

        }
      } catch (error) {
        console.log(error)
        alert(error.response?.data?.msg)
  
      }
    console.log(item);
    } else if (events.length === 0) {
      navigate("/events", {
        state: {
          showCreateEventModal: true,
          vendorToAdd: { ...vendor, category },
        },
      });
    } else {
      setSelectedVendor({ ...vendor, category });
      setShowEventModal(true);
    }
  };

  const addServiceItemToEvent = async (eventId, item) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/budget/${eventId}/item`,
        {
          category: item.category,
          amount: item.amount,
          id: item.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        console.log(response.data)
        dispatch(addServiceToEvent(eventId, selectedVendor));
        dispatch(
          addEventBudgetItem(eventId, response.data)
        );
        setToastMessage(`${selectedVendor.name} added to your event!`);
        setShowToast(true);
        setShowEventModal(false);

        // alert(response.data.msg)
        // setActiveTab("list");
      }else if(response.status === 204){
        alert('Service is already added.')
      } else {
        alert("Failed to create event:",response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.msg)

    }
  }
  const handleAddServiceToEvent = async (eventId) => {

    const targetEvent = events.find((event) => event._id === eventId);
    if (targetEvent && isVendorAdded(selectedVendor)) {
      setToastMessage(`${selectedVendor.name} is already added to the event!`);
      setShowToast(true);
      setShowEventModal(false);
      return;
    }
    let item = {
      id: `item_${Date.now()}`,
      category: `${selectedVendor.category} - ${selectedVendor.name}`,
      amount: selectedVendor.cost,
    }
    await addServiceItemToEvent(eventId, item)

  };

  return (
    <Container>
      <div className="header-container d-flex justify-content-between align-items-center mb-4">
        <Button as={Link} to="/vendors" className="back-button flex-shrink-0">
          Back to Vendors
        </Button>
        <h2 className="title m-0 text-center flex-grow-1">{category}</h2>
        {eventId && currentEvent ? (
          <Badge bg="info" className="event-badge flex-shrink-0">
            For Event: {currentEvent.name}
          </Badge>
        ) : (
          <div className="badge-placeholder"></div>
        )}
      </div>
      <Row>
        {vendors.length > 0 ? (
          vendors.map((vendor) => (
            <Col key={vendor._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{vendor.name}</Card.Title>
                  <Card.Img className="vendor-img" src={vendor.img}></Card.Img>
                  <Card.Subtitle className="mb-2 text-muted">
                    Rating: {vendor.rating} | Cost: ₹{vendor.cost}
                  </Card.Subtitle>
                  <Card.Text>{vendor.description}</Card.Text>
                  <Button
                    variant={isVendorAdded(vendor) ? "secondary" : "primary"}
                    onClick={() => handleAddService(vendor)}
                    disabled={isVendorAdded(vendor)}
                  >
                    {isVendorAdded(vendor) ? "Already Added" : "Add Service"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No vendors available for this category.</p>
        )}
      </Row>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Service Added</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      <Modal show={showEventModal} onHide={() => setShowEventModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {events.map((event) => (
            <Button
              key={event._id}
              variant="outline-primary"
              className="m-2"
              onClick={() => handleAddServiceToEvent(event._id)}
            >
              {event.name}
            </Button>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default VendorCategory;

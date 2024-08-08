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

  const events = useSelector((state) => state.events.events);
  const currentEvent = useSelector((state) =>
    state.events.events.find((event) => event.id === parseInt(eventId))
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

  const handleAddService = (vendor) => {
    if (eventId) {
      if (isVendorAdded(vendor)) {
        setToastMessage(`${vendor.name} is already added to your event!`);
        setShowToast(true);
        return;
      }
      dispatch(addServiceToEvent(parseInt(eventId), { ...vendor, category }));
      dispatch(
        addEventBudgetItem(parseInt(eventId), {
          id: `item_${Date.now()}`,
          category: `${category} - ${vendor.name}`,
          amount: vendor.cost,
        })
      );
      setToastMessage(`${vendor.name} added to your event!`);
      setShowToast(true);
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

  const handleAddServiceToEvent = (eventId) => {
    const targetEvent = events.find((event) => event.id === eventId);
    if (targetEvent && isVendorAdded(selectedVendor)) {
      setToastMessage(`${selectedVendor.name} is already added to the event!`);
      setShowToast(true);
      setShowEventModal(false);
      return;
    }
    dispatch(addServiceToEvent(eventId, selectedVendor));
    dispatch(
      addEventBudgetItem(eventId, {
        id: `item_${Date.now()}`,
        category: `${selectedVendor.category} - ${selectedVendor.name}`,
        amount: selectedVendor.cost,
      })
    );
    setToastMessage(`${selectedVendor.name} added to your event!`);
    setShowToast(true);
    setShowEventModal(false);
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
            <Col key={vendor.id} md={4} className="mb-4">
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
              key={event.id}
              variant="outline-primary"
              className="m-2"
              onClick={() => handleAddServiceToEvent(event.id)}
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

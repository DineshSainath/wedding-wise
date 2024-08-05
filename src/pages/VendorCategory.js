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

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (vendorData[category]) {
      setVendors(vendorData[category]);
    }
  }, [category]);

  const handleAddService = (vendor) => {
    if (eventId) {
      dispatch(addServiceToEvent(parseInt(eventId), { ...vendor, category }));
      dispatch(
        addEventBudgetItem(parseInt(eventId), {
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
    dispatch(addServiceToEvent(eventId, selectedVendor));
    dispatch(
      addEventBudgetItem(eventId, {
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
      <Button as={Link} to="/vendors" className="mb-3">
        Back to Vendors
      </Button>
      <h2 className="mb-4">
        {category}
        {eventId && (
          <Badge bg="info" className="badge ms-2">
            For Event: {currentEvent?.name || eventId}
          </Badge>
        )}
      </h2>
      <Row>
        {vendors.length > 0 ? (
          vendors.map((vendor) => (
            <Col key={vendor.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{vendor.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Rating: {vendor.rating} | Cost: ₹{vendor.cost}
                  </Card.Subtitle>
                  <Card.Text>{vendor.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddService(vendor)}
                  >
                    Add Service
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

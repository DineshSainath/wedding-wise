/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";

function Vendors() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventId");

  //

  const events = useSelector((state) => state.events.events);
  const currentEvent = useSelector((state) =>
    state.events.events.find((event) => event._id === parseInt(eventId))
  );

  //

  const categories = [
    {
      name: "Venues",
      icon: "🏰",
      description: "Find the perfect location for your special day",
    },
    {
      name: "Photography",
      icon: "📸",
      description: "Capture your memories with professional photographers",
    },
    {
      name: "Catering",
      icon: "🍽️",
      description: "Delight your guests with exquisite cuisine",
    },
    {
      name: "Decor",
      icon: "🎉",
      description: "Transform your venue with stunning decorations",
    },
    {
      name: "Music",
      icon: "🎵",
      description: "Set the mood with talented musicians and DJs",
    },
    {
      name: "Attire",
      icon: "👰",
      description: "Find the perfect dress and suit for your big day",
    },
  ];

  return (
    <Container>
      <div className="header-container d-flex justify-content-between align-items-center mb-4">
        <Button as={Link} to="/events" className="back-button flex-shrink-0">
          Back to Events
        </Button>
        <h2 className="title m-0 text-center flex-grow-1">Vendor Categories</h2>
        {eventId ? (
          <Badge bg="info" className="event-badge flex-shrink-0">
            For Event: {currentEvent?.name || eventId}
          </Badge>
        ) : (
          <div className="badge-placeholder"></div>
        )}
      </div>
      <Row xs={1} md={2} className="g-4">
        {categories.map((category, index) => (
          <Col key={index}>
            <Card
              as={Link}
              to={`/Vendors/${category.name}${
                eventId ? `?eventId=${eventId}` : ""
              }`}
              className="h-100 text-decoration-none"
            >
              <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex align-items-center mb-3">
                  <span className="fs-2 me-2">{category.icon}</span>
                  <span>{category.name}</span>
                </Card.Title>
                <Card.Text>{category.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Vendors;

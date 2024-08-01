import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";

function Vendors() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventId");

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
      <Button as={Link} to="/events" className="mb-3">
        Back to Events
      </Button>
      <h2 className="mb-4">
        Vendor Categories
        {eventId && (
          <Badge bg="info" className="ms-2">
            For Event: {eventId}
          </Badge>
        )}
      </h2>
      <Row xs={1} md={2} className="g-4">
        {categories.map((category, index) => (
          <Col key={index}>
            <Card
              as={Link}
              to={`/vendors/${category.name.toLowerCase()}${
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

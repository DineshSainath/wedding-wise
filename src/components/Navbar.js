import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/custom.css";

function AppNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Wedding Wise
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/#package">Packages</Nav.Link>
            <Nav.Link as={Link} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/Vendors">
              Vendors
            </Nav.Link>
            {/*
             */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Vendors from "./pages/Vendors";
import VendorCategory from "./pages/VendorCategory";
import Budget from "./pages/Budget";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Container className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<PrivateRoute  element={<Home />} />} />
            <Route path="/events" element={<PrivateRoute element={<Events />} />} />
            <Route path="/vendors" element={<PrivateRoute element={<Vendors />} />} />
            <Route path="/vendors/:category" element={<PrivateRoute element={<VendorCategory />} />} />
            <Route path="/budget/:eventId" element={<PrivateRoute element={<Budget />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

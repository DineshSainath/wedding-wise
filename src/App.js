import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Vendors from "./pages/Vendors";
import VendorCategory from "./pages/VendorCategory";
import Budget from "./pages/Budget";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />
        <Route
          path="/vendors"
          element={
            <PrivateRoute>
              <Vendors />
            </PrivateRoute>
          }
        />
        <Route
          path="/vendors/:category"
          element={
            <PrivateRoute>
              <VendorCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/budget/:eventId"
          element={
            <PrivateRoute>
              <Budget />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

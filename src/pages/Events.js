import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addEvent,
  updateEvent,
  deleteEvent,
} from "../redux/actions/eventActions";
import { setEventTotalBudget } from "../redux/actions/budgetActions";
import { Container, Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import EventCard from "../components/EventCard";

function Events() {
  const [activeTab, setActiveTab] = useState("add");
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Event name is required"),
    date: Yup.date().required("Event date is required"),
    details: Yup.string(),
    budget: Yup.number()
      .positive("Budget must be a positive number")
      .required("Budget is required"),
  });

  const handleAddEvent = (values, { resetForm }) => {
    const eventId = Date.now();
    dispatch(addEvent({ ...values, id: eventId }));
    dispatch(setEventTotalBudget(eventId, Number(values.budget)));
    resetForm();
    setActiveTab("list");
  };

  const handleUpdateEvent = (updatedEvent) => {
    dispatch(updateEvent(updatedEvent));
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return (
    <Container>
      <h2 className="mb-3">Events</h2>
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        id="events-tabs"
      >
        <Tab eventKey="add" title="Add an Event">
          <Formik
            initialValues={{ name: "", date: "", details: "", budget: "" }}
            validationSchema={validationSchema}
            onSubmit={handleAddEvent}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Label>Event Name</Form.Label>
                  <Field name="name" type="text" as={Form.Control} />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Field name="date" type="date" as={Form.Control} />
                      <ErrorMessage
                        name="date"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Budget</Form.Label>
                      <Field name="budget" type="number" as={Form.Control} />
                      <ErrorMessage
                        name="budget"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Details</Form.Label>
                  <Field
                    name="details"
                    as="textarea"
                    rows={3}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="details"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Add Event
                </Button>
              </Form>
            )}
          </Formik>
        </Tab>
        <Tab eventKey="list" title="Event List">
          <Row className="mt-3">
            {events.map((event) => (
              <Col md={6} lg={4} key={event.id}>
                <EventCard
                  event={event}
                  onUpdate={handleUpdateEvent}
                  onDelete={handleDeleteEvent}
                />
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Events;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addEvent,
  updateEvent,
  deleteEvent,
  setEvents
} from "../redux/actions/eventActions";
import { addEventBudgetItem, removeAllEventItems, setEventTotalBudget } from "../redux/actions/budgetActions";
import { Container, Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import EventCard from "../components/EventCard";
import axios from "axios";

function Events() {
  const [activeTab, setActiveTab] = useState("list");
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Event name is required"),
    date: Yup.date().required("Event date is required"),
    details: Yup.string(),
    budget: Yup.number()
      .positive("Budget must be a positive number")
      .required("Budget is required"),
  });

  const handleAddEvent = async (values, { resetForm }) => {

    console.log('token', token)
    console.log('values', values)
    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        {
          name: values.name,
          date: values.date,
          details: values.details,
          budget: values.budget,
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
        const eventId = response.data.events._id; // Assuming the API returns the event ID
        dispatch(addEvent({ ...values, id: eventId }));
        dispatch(setEventTotalBudget(eventId, Number(values.budget)));
        resetForm();
        setActiveTab("list");
      } else {
        alert("Failed to create event:",response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
      alert("Error creating event "+error.response.statusText);
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {

    try {
      const response = await axios.put(
        `http://localhost:5000/api/events/${updatedEvent.eventId}`,
        {
          name: updatedEvent.name,
          date: updatedEvent.date,
          budget: updatedEvent.budget,
          details: updatedEvent.details,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        console.log('updated event', response.data)

        dispatch(updateEvent(response.data));
    dispatch(setEventTotalBudget(updatedEvent.eventId, Number(updatedEvent.budget)));


        // alert(response.data.msg)
        setActiveTab("list");
      } else {
        alert("Failed to create event:",response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
      alert(error.response.data.msg)

    }

  };

  const handleDeleteEvent = async (eventId) => {


    try {
      const response = await axios.delete(
        `http://localhost:5000/api/events/${eventId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        console.log(response.data)
    dispatch(deleteEvent(eventId));

        alert(response.data.msg)
        // setActiveTab("list");
      } else {
        alert("Failed to create event:",response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
      alert(error.response.data.msg)

    }

  };

   useEffect(() => {
    console.log('useEffect() called')
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (response.status === 200) {
          let eventData = response.data
          console.log(eventData);
          dispatch(setEvents(eventData)); // Assuming you have a setEvents action to set the fetched events in the Redux store
        } else {
          alert("Failed to fetch events:", response?.data?.msg);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Error fetching events: " + error.message);
      }
    };
    if(activeTab === "list"){
    console.log('useEffect() called if')

      fetchEvents();

    }
  }, [activeTab || events || dispatch]);

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
            {events.map((event) => { 

              return (
              <Col md={6} lg={4} key={event._id}>
                <EventCard
                  event={event}
                  onUpdate={handleUpdateEvent}
                  onDelete={handleDeleteEvent}
                />
              </Col>
            )
            }
          )
          }
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Events;

import api from "../../services/api";
import { addBudgetItem } from "./budgetActions";

export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const ADD_SERVICE_TO_EVENT_SUCCESS = "ADD_SERVICE_TO_EVENT_SUCCESS";
export const ADD_EVENT_FAILURE = "ADD_EVENT_FAILURE";

export const fetchEvents = () => async (dispatch) => {
  try {
    console.log("Fetching events...");
    const res = await api.get("/events");
    console.log("Fetched events:", res.data);
    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error("Error fetching events:", err);
  }
};

export const addEvent = (eventData) => async (dispatch) => {
  try {
    console.log("Sending event data to backend:", eventData);
    const res = await api.post("/events", eventData);
    console.log("Response from backend after adding event:", res.data);

    dispatch({
      type: ADD_EVENT_SUCCESS,
      payload: res.data,
    });

    // Dispatch fetchEvents to refresh the list
    await dispatch(fetchEvents());

    return true;
  } catch (err) {
    console.error("Error adding event:", err);
    return false;
  }
};

export const updateEvent = (eventId, eventData) => async (dispatch) => {
  try {
    console.log("Updating event:", eventId, eventData);
    const res = await api.put(`/events/${eventId}`, eventData);
    console.log("Updated event:", res.data);
    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(
      "Error updating event:",
      err.response ? err.response.data : err.message
    );
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    console.log("Deleting event:", eventId);
    await api.delete(`/events/${eventId}`);
    console.log("Deleted event:", eventId);
    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: eventId,
    });
  } catch (err) {
    console.error("Error deleting event:", err);
  }
};

export const addServiceToEvent = (eventId, service) => async (dispatch) => {
  try {
    console.log("Adding service to event:", eventId, service);
    const res = await api.post(`/events/${eventId}/services`, service);
    console.log("Added service to event:", res.data);
    dispatch({
      type: ADD_SERVICE_TO_EVENT_SUCCESS,
      payload: { eventId, service: res.data },
    });
    dispatch(
      addBudgetItem(eventId, {
        category: `${service.category} - ${service.name}`,
        amount: service.cost,
      })
    );
  } catch (err) {
    console.error("Error adding service to event:", err);
  }
};

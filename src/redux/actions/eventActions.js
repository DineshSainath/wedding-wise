import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

// Helper function to get auth header
const getAuthHeader = () => ({
  headers: { "x-auth-token": localStorage.getItem("token") },
});

export const addEvent = (event) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, event, getAuthHeader());
    dispatch({ type: "ADD_EVENT", payload: response.data });
  } catch (error) {
    console.error("Error adding event:", error);
  }
};

export const updateEvent = (event) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_URL}/${event.id}`,
      event,
      getAuthHeader()
    );
    dispatch({ type: "UPDATE_EVENT", payload: response.data });
  } catch (error) {
    console.error("Error updating event:", error);
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${eventId}`, getAuthHeader());
    dispatch({ type: "DELETE_EVENT", payload: eventId });
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};

export const addServiceToEvent = (eventId, service) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/add-service`,
      { eventId, service },
      getAuthHeader()
    );
    dispatch({
      type: "ADD_SERVICE_TO_EVENT",
      payload: { eventId, service: response.data },
    });
  } catch (error) {
    console.error("Error adding service to event:", error);
  }
};

export const getEvents = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL, getAuthHeader());
    dispatch({ type: "SET_EVENTS", payload: response.data });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

import axios from "axios";

const API_URL = "http://localhost:5000/api/budgets";

// Helper function to get auth header
const getAuthHeader = () => ({
  headers: { "x-auth-token": localStorage.getItem("token") },
});

export const setEventTotalBudget = (eventId, amount) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_URL}/${eventId}`,
      { totalBudget: amount },
      getAuthHeader()
    );
    dispatch({
      type: "SET_EVENT_TOTAL_BUDGET",
      payload: { eventId, amount: response.data.totalBudget },
    });
  } catch (error) {
    console.error("Error setting total budget:", error);
  }
};

export const addEventBudgetItem = (eventId, item) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/add-item`,
      { eventId, item },
      getAuthHeader()
    );
    dispatch({
      type: "ADD_EVENT_BUDGET_ITEM",
      payload: { eventId, item: response.data },
    });
  } catch (error) {
    console.error("Error adding budget item:", error);
  }
};

export const updateEventBudgetItem = (eventId, item) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_URL}/${eventId}`,
      { items: [item] },
      getAuthHeader()
    );
    dispatch({
      type: "UPDATE_EVENT_BUDGET_ITEM",
      payload: { eventId, item: response.data },
    });
  } catch (error) {
    console.error("Error updating budget item:", error);
  }
};

export const deleteEventBudgetItem = (eventId, itemId) => async (dispatch) => {
  try {
    await axios.delete(
      `${API_URL}/${eventId}/items/${itemId}`,
      getAuthHeader()
    );
    dispatch({
      type: "DELETE_EVENT_BUDGET_ITEM",
      payload: { eventId, itemId },
    });
  } catch (error) {
    console.error("Error deleting budget item:", error);
  }
};

export const getEventBudget = (eventId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/${eventId}`, getAuthHeader());
    dispatch({
      type: "SET_EVENT_BUDGET",
      payload: { eventId, budget: response.data },
    });
  } catch (error) {
    console.error("Error fetching event budget:", error);
  }
};

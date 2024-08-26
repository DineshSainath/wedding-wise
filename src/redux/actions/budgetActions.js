import api from "../../services/api";

export const FETCH_BUDGET_SUCCESS = "FETCH_BUDGET_SUCCESS";
export const ADD_BUDGET_ITEM_SUCCESS = "ADD_BUDGET_ITEM_SUCCESS";
export const UPDATE_BUDGET_ITEM_SUCCESS = "UPDATE_BUDGET_ITEM_SUCCESS";
export const DELETE_BUDGET_ITEM_SUCCESS = "DELETE_BUDGET_ITEM_SUCCESS";

export const fetchBudget = (eventId) => async (dispatch) => {
  try {
    if (!eventId) {
      throw new Error("Event ID is undefined");
    }
    const res = await api.get(`/events/${eventId}/budget`);
    dispatch({
      type: FETCH_BUDGET_SUCCESS,
      payload: { eventId, budget: res.data },
    });
  } catch (err) {
    console.error("Error fetching budget:", err);
  }
};

export const addBudgetItem = (eventId, item) => async (dispatch) => {
  try {
    if (!eventId) {
      throw new Error("Event ID is undefined");
    }
    const res = await api.post(`/events/${eventId}/budget`, item);
    dispatch({
      type: ADD_BUDGET_ITEM_SUCCESS,
      payload: { eventId, item: res.data },
    });
  } catch (err) {
    console.error("Error adding budget item:", err);
  }
};

export const updateBudgetItem = (eventId, itemId, item) => async (dispatch) => {
  try {
    if (!eventId || !itemId) {
      throw new Error("Event ID or Item ID is undefined");
    }
    const res = await api.put(`/events/${eventId}/budget/${itemId}`, item);
    dispatch({
      type: UPDATE_BUDGET_ITEM_SUCCESS,
      payload: { eventId, item: res.data },
    });
  } catch (err) {
    console.error("Error updating budget item:", err);
  }
};

export const deleteBudgetItem = (eventId, itemId) => async (dispatch) => {
  try {
    if (!eventId || !itemId) {
      throw new Error("Event ID or Item ID is undefined");
    }
    await api.delete(`/events/${eventId}/budget/${itemId}`);
    dispatch({
      type: DELETE_BUDGET_ITEM_SUCCESS,
      payload: { eventId, itemId },
    });
  } catch (err) {
    console.error("Error deleting budget item:", err);
  }
};

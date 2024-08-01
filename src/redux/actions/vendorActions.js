import axios from "axios";

const API_URL = "http://localhost:5000/api/vendors";

export const getVendors = (category) => async (dispatch) => {
  try {
    dispatch({ type: "VENDORS_LOADING" });
    const response = await axios.get(
      `${API_URL}${category ? `?category=${category}` : ""}`
    );
    dispatch({ type: "SET_VENDORS", payload: response.data });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    dispatch({
      type: "SET_VENDORS_ERROR",
      payload: error.response?.data?.message || error.message,
    });
  }
};

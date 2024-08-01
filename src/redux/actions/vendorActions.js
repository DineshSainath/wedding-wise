import axios from "axios";

const API_URL = "http://localhost:5000/api/vendors";

// Helper function to get auth header
const getAuthHeader = () => ({
  headers: { "x-auth-token": localStorage.getItem("token") },
});

export const getVendors = (category) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}${category ? `?category=${category}` : ""}`
    );
    dispatch({ type: "SET_VENDORS", payload: response.data });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    dispatch({ type: "SET_VENDORS_ERROR", payload: error.message });
  }
};

// If you have any protected vendor routes, add them here with the auth header
export const someProtectedVendorAction = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/some-protected-route`,
      data,
      getAuthHeader()
    );
    dispatch({ type: "SOME_ACTION", payload: response.data });
  } catch (error) {
    console.error("Error in protected vendor action:", error);
  }
};

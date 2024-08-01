import axios from "axios";

export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      userData
    );
    localStorage.setItem("token", response.data.token);
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      credentials
    );
    localStorage.setItem("token", response.data.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};

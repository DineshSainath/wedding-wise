import axios from "axios";

// Action types
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";

export const loginUser = (credentials) => async (dispatch) => {
    console.log(credentials)
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
    const { token } = response.data;
    console.log('response',response)

    // // Store the token in localStorage
    localStorage.setItem("token", token);

    // // Dispatch the login success action
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
  window.location.href = "/"; // Redirect to home
  } catch (error) {
   alert(error.response?.data?.msg);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

  
  export const registerUser = (userData) => async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", userData);
      const { token } = response.data;
      console.log('response',response)
  
      // // Store the token in localStorage
      localStorage.setItem("token", token);
  
      // // Dispatch the login success action
      dispatch({
        type: LOGIN_SUCCESS,
        payload: token,
      });

    window.location.href = "/"; // Redirect to home

    } catch (error) {
      alert(error.response?.data?.msg);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response?.data?.message || "Registration failed",
      });
    }
  };
  
  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };
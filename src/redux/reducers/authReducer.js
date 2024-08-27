const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";

const initialState = {
    isAuthenticated: !!localStorage.getItem("token"), // Check if token exists in localStorage
    token: localStorage.getItem("token"),
    user: null,
    loading: false,
    error: null,
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload,
          loading: false,
          error: null,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          loading: false,
          error: action.payload,
        };
      case "LOGOUT":
        localStorage.removeItem("token");
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          user: null,
          loading: false,
        };
      default:
        return state;
    }
  }
  
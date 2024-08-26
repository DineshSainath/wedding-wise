import api from "../../services/api";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGOUT = "LOGOUT";

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
    return false;
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
    return false;
  }
};

export const logout = () => ({ type: LOGOUT });

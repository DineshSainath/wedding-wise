// src/redux/reducers/vendorReducer.js

const initialState = {
  vendors: [],
  loading: false,
  error: null,
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VENDORS":
      return {
        ...state,
        vendors: action.payload,
        loading: false,
        error: null,
      };
    case "SET_VENDORS_ERROR":
      return {
        ...state,
        vendors: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default vendorReducer;

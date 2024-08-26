import { FETCH_VENDORS_BY_CATEGORY_SUCCESS } from "../actions/vendorActions";

const initialState = {
  vendorsByCategory: {},
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VENDORS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        vendorsByCategory: {
          ...state.vendorsByCategory,
          [action.payload.category]: action.payload.vendors,
        },
      };
    default:
      return state;
  }
};

export default vendorReducer;

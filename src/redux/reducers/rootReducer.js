import { combineReducers } from "redux";
import authReducer from "./authReducer";
import eventReducer from "./eventReducer";
import vendorReducer from "./vendorReducer";
import budgetReducer from "./budgetReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
  vendors: vendorReducer,
  budget: budgetReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import eventReducer from "./eventReducer";
import vendorReducer from "./vendorReducer";
import budgetReducer from "./budgetReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  events: eventReducer,
  vendors: vendorReducer,
  budget: budgetReducer,
  auth: authReducer,
});

export default rootReducer;

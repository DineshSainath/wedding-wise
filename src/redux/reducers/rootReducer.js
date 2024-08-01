import { combineReducers } from "redux";
import eventReducer from "./eventReducer";
import vendorReducer from "./vendorReducer";
import budgetReducer from "./budgetReducer";

const rootReducer = combineReducers({
  events: eventReducer,
  vendors: vendorReducer,
  budget: budgetReducer,
});

export default rootReducer;

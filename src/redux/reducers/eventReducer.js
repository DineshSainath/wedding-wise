import {
  FETCH_EVENTS_SUCCESS,
  ADD_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  ADD_SERVICE_TO_EVENT_SUCCESS,
} from "../actions/eventActions";

const initialState = {
  events: [],
};

const eventReducer = (state = initialState, action) => {
  console.log("Event Reducer: Action received", action.type);
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      console.log("FETCH_EVENTS_SUCCESS payload:", action.payload);
      return {
        ...state,
        events: action.payload,
      };
    case ADD_EVENT_SUCCESS:
      console.log("ADD_EVENT_SUCCESS payload:", action.payload);
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case UPDATE_EVENT_SUCCESS:
      console.log("UPDATE_EVENT_SUCCESS payload:", action.payload);
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case DELETE_EVENT_SUCCESS:
      console.log("DELETE_EVENT_SUCCESS payload:", action.payload);
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case ADD_SERVICE_TO_EVENT_SUCCESS:
      console.log("ADD_SERVICE_TO_EVENT_SUCCESS payload:", action.payload);
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.eventId
            ? {
                ...event,
                services: [...(event.services || []), action.payload.service],
              }
            : event
        ),
      };
    default:
      return state;
  }
};

export default eventReducer;

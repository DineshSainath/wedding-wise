const initialState = {
  events: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case "ADD_SERVICE_TO_EVENT":
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
    case "REMOVE_SERVICE_FROM_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.eventId
            ? {
                ...event,
                services: (event.services || []).filter(
                  (service) => service.id !== action.payload.serviceId
                ),
              }
            : event
        ),
      };
    default:
      return state;
  }
};

export default eventReducer;

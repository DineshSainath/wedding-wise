const initialState = {
  events: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload,
      };
    case "ADD_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
      };
    case "ADD_SERVICE_TO_EVENT":
      console.log("add_service_to_event", action.payload);
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.eventId
            ? {
                ...event,
                services: [...(event.services || []), action.payload.service],
              }
            : event
        ),
      };
    case "DELETE_EVENT_BUDGET_ITEM":
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.eventId
            ? {
                ...event,
                services: (event.services || []).filter(
                  (service) =>
                    `${service.category} - ${service.name}` !==
                    action.payload.itemCategory
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

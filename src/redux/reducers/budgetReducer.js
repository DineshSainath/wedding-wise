// budgetReducer.js

const initialState = {
  eventBudgets: {},
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EVENT_TOTAL_BUDGET":
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            totalBudget: action.payload.amount,
            items: state.eventBudgets[action.payload.eventId]?.items || [],
          },
        },
      };

    case "ADD_EVENT_BUDGET_ITEM":
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            items: [
              ...(state.eventBudgets[action.payload.eventId]?.items || []),
              action.payload.item,
            ],
          },
        },
      };

    case "UPDATE_EVENT_BUDGET_ITEM":
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            items: state.eventBudgets[action.payload.eventId].items.map(
              (item) =>
                item.id === action.payload.item.id ? action.payload.item : item
            ),
          },
        },
      };

    case "DELETE_EVENT_BUDGET_ITEM":
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            items: state.eventBudgets[action.payload.eventId].items.filter(
              (item) => item.id !== action.payload.itemId
            ),
          },
        },
      };

    case "UPDATE_EVENT_BUDGET":
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            totalBudget:
              (state.eventBudgets[action.payload.eventId]?.totalBudget || 0) +
              action.payload.amount,
          },
        },
      };

    default:
      return state;
  }
};

export default budgetReducer;

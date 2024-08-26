import {
  FETCH_BUDGET_SUCCESS,
  ADD_BUDGET_ITEM_SUCCESS,
  UPDATE_BUDGET_ITEM_SUCCESS,
  DELETE_BUDGET_ITEM_SUCCESS,
} from "../actions/budgetActions";
import {
  FETCH_EVENTS_SUCCESS,
  ADD_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
} from "../actions/eventActions";

const initialState = {
  eventBudgets: {},
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      const newEventBudgets = {};
      action.payload.forEach((event) => {
        newEventBudgets[event.id] = event.budget || {
          totalBudget: 0,
          items: [],
        };
      });
      return {
        ...state,
        eventBudgets: newEventBudgets,
      };

    case ADD_EVENT_SUCCESS:
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.id]: action.payload.budget || {
            totalBudget: 0,
            items: [],
          },
        },
      };

    case FETCH_BUDGET_SUCCESS:
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            ...action.payload.budget,
          },
        },
      };

    case ADD_BUDGET_ITEM_SUCCESS:
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            totalBudget:
              (state.eventBudgets[action.payload.eventId]?.totalBudget || 0) +
              parseFloat(action.payload.item.amount),
            items: [
              ...(state.eventBudgets[action.payload.eventId]?.items || []),
              action.payload.item,
            ],
          },
        },
      };

    case UPDATE_BUDGET_ITEM_SUCCESS:
      const updatedItems = state.eventBudgets[action.payload.eventId].items.map(
        (item) =>
          item.id === action.payload.item.id ? action.payload.item : item
      );
      const newTotalBudget = updatedItems.reduce(
        (sum, item) => sum + parseFloat(item.amount),
        0
      );
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            totalBudget: newTotalBudget,
            items: updatedItems,
          },
        },
      };

    case DELETE_BUDGET_ITEM_SUCCESS:
      const remainingItems = state.eventBudgets[
        action.payload.eventId
      ].items.filter((item) => item.id !== action.payload.itemId);
      const updatedTotalBudget = remainingItems.reduce(
        (sum, item) => sum + parseFloat(item.amount),
        0
      );
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            totalBudget: updatedTotalBudget,
            items: remainingItems,
          },
        },
      };

    default:
      return state;
  }
};

export default budgetReducer;

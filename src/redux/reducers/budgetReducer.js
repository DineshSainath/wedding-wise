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
      console.log("Adding item:", action.payload.item);
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            items: [
              ...(state.eventBudgets[action.payload.eventId]?.items || []),
              {
                ...action.payload.item,
                id: action.payload.item.id || `item_${Date.now()}`,
              },
            ],
          },
        },
      };

    case "DELETE_EVENT_BUDGET_ITEM":
      console.log("Deleting item. Payload:", action.payload);
      if (!action.payload.itemId) {
        console.error("Attempted to delete item with undefined ID");
        return state;
      }
      const currentItems =
        state.eventBudgets[action.payload.eventId]?.items || [];
      console.log("Current items:", currentItems);
      const updatedItems = currentItems.filter(
        (item) => item.id !== action.payload.itemId
      );
      console.log("Updated items:", updatedItems);
      return {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            items: updatedItems,
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

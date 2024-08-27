const initialState = {
  eventBudgets: {},
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EVENT_TOTAL_BUDGET":
      console.log(action.payload)
      console.log('prev', state)
      let newState= {
        ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            ...state.eventBudgets[action.payload.eventId],
            totalBudget: action.payload.amount,
            items: state.eventBudgets[action.payload.eventId]?.items || [],
          },
        },
      }

      console.log('new', newState)

      return newState;

    case "ADD_EVENT_BUDGET_ITEM":
      console.log("Adding item:", action.payload.item);
      console.log(state)
      const { eventId, item } = action.payload;
      let currentItemss = state.eventBudgets[eventId]?.items || [];

      // Check if the item already exists
      const itemExists = currentItemss.some((existingItem) => existingItem._id === item._id);

      if (itemExists) {
        // Return the same state if item already exists
        return { ...state };
      }

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
              },
            ],
          },
        },
      };

    case "REMOVE_ALL_EVENT_ITEMS":
      console.log("case matched")
      return {
        // ...state,
        eventBudgets: {
          ...state.eventBudgets,
          [action.payload.eventId]: {
            totalBudget: 0,
            items: [],
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

        console.log('currentItems',currentItems)
        console.log(currentItems.length)
      const updatedItems = currentItems.filter(
        (item) => item._id !== action.payload.itemId
      );

      console.log('updatedItems',updatedItems)
      console.log(updatedItems.length)

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

    default:
      return state;
  }
};

export default budgetReducer;

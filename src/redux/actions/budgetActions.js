export const setEventTotalBudget = (eventId, amount) => ({
  type: "SET_EVENT_TOTAL_BUDGET",
  payload: { eventId, amount },
});

export const addEventBudgetItem = (eventId, item) => ({
  type: "ADD_EVENT_BUDGET_ITEM",
  payload: { eventId, item },
});

export const updateEventBudgetItem = (eventId, item) => ({
  type: "UPDATE_EVENT_BUDGET_ITEM",
  payload: { eventId, item },
});

export const deleteEventBudgetItem = (eventId, itemId, itemCategory) => ({
  type: "DELETE_EVENT_BUDGET_ITEM",
  payload: { eventId, itemId, itemCategory },
});

export const updateEventBudget = (eventId, amount) => ({
  type: "UPDATE_EVENT_BUDGET",
  payload: { eventId, amount },
});

export const removeAllEventItems = () => ({
  type: "REMOVE_ALL_EVENT_ITEMS",
  payload: [],
});

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

export const deleteEventBudgetItem = (eventId, itemId) => ({
  type: "DELETE_EVENT_BUDGET_ITEM",
  payload: { eventId, itemId },
});

export const updateEventBudget = (eventId, amount) => ({
  type: "UPDATE_EVENT_BUDGET",
  payload: { eventId, amount },
});

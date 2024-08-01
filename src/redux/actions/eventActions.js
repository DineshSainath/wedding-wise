export const addEvent = (event) => ({
  type: "ADD_EVENT",
  payload: event,
});

export const updateEvent = (event) => ({
  type: "UPDATE_EVENT",
  payload: event,
});

export const deleteEvent = (eventId) => ({
  type: "DELETE_EVENT",
  payload: eventId,
});

export const addServiceToEvent = (eventId, service) => ({
  type: "ADD_SERVICE_TO_EVENT",
  payload: { eventId, service },
});

export const ADD_DATES_TO_LOCATION = 'ADD_DATES_TO_LOCATION';

export const addDatesToLocation = (dates, locationId) => ({
  type: ADD_DATES_TO_LOCATION,
  dates,
  locationId,
});

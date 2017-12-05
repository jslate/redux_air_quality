export const ADD_DATES_TO_LOCATION = 'ADD_DATES_TO_LOCATION';
export const ADD_BLOCK = 'ADD_BLOCK';

export const addDatesToLocation = (dates, locationId) => ({
  type: ADD_DATES_TO_LOCATION,
  dates,
  locationId,
});

export const addBlock = (location, exertion, time, minutes) => ({
  type: ADD_BLOCK,
  location,
  exertion,
  time,
  minutes,
});

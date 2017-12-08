import { ADD_DATES_TO_LOCATION } from './../Actions';

const locations = (state = [], action) => {
  switch (action.type) {
    case ADD_DATES_TO_LOCATION:
      return state.map((location) => {
        if (location.id === action.locationId) {
          return {
            ...location,
            dates: action.dates,
          };
        }
        return location;
      });
    default:
      return state;
  }
};

export default locations;

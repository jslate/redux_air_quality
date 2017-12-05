import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';
import Locations from './Locations';
import AddForm from './AddForm';
import Blocks from './Blocks';
import { ADD_DATES_TO_LOCATION, ADD_BLOCK } from './Actions';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_DATES_TO_LOCATION:
      return {
        ...state,
        locations: state.locations.map((location) => {
          if (location.id === action.locationId) {
            return {
              ...location,
              dates: action.dates,
            };
          }
          return location;
        }),
      };
    case ADD_BLOCK:
      return Object.assign({}, state, {
        blocks: [
          ...state.blocks || [],
          {
            locationId: action.location,
            exertion: action.exertion,
            time: action.time,
            minutes: action.minutes,
          },
        ],
      });
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  {
    locations: Locations,
    blocks: [
      {
        time: 1512497760, locationId: 213, exertion: 'low', minutes: 90,
      },
      {
        time: 1512507760, locationId: 14, exertion: 'moderate', minutes: 120,
      },
      {
        time: 1512398760, locationId: 289, exertion: 'high', minutes: 30,
      },
    ],
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = () => (
  <div className="App">
    <AddForm />
    <Blocks />
  </div>
);

const WrappedAppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedAppWithProvider;

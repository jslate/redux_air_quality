import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';
import Locations from './Locations';
import AddForm from './AddForm';
import Blocks from './Blocks';
import { ADD_DATES_TO_LOCATION, ADD_BLOCK, REMOVE_BLOCK } from './Actions';

let blockIdIncrementer = 3;

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
      blockIdIncrementer += 1;
      return Object.assign({}, state, {
        blocks: [
          ...state.blocks || [],
          {
            id: blockIdIncrementer,
            locationId: action.location,
            exertion: action.exertion,
            time: action.time,
            minutes: action.minutes,
          },
        ],
      });
    case REMOVE_BLOCK:
      return Object.assign({}, state, {
        blocks: state.blocks.filter(block => block.id !== action.id),
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
        id: 1, time: 1512497760, locationId: 213, exertion: 'low', minutes: 90,
      },
      {
        id: 2, time: 1512507760, locationId: 14, exertion: 'moderate', minutes: 120,
      },
      {
        id: 3, time: 1512398760, locationId: 289, exertion: 'high', minutes: 30,
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

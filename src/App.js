import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import './App.css';
import Locations from './Locations';
import LocationSelect from './LocationSelect';
import { ADD_DATES_TO_LOCATION } from './Actions';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_DATES_TO_LOCATION:
      // debugger
      return {
        ...state,
        locations: state.locations.map((location) => {
          if (location.id === action.locationId) {
            return {
              ...location,
              dates: action.dates
            }
          }
          return location;
        })
      }
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  { locations: Locations },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <LocationSelect />
        </p>
      </div>
    );
  }
}

class WrappedAppWithProvider extends React.Component {
  render = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default WrappedAppWithProvider;

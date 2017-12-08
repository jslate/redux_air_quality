import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';
import Locations from './Locations';
import AddForm from './AddForm';
import Blocks from './Blocks';
import airQualityApp from './reducers';
import UndoRedo from './UndoRedo';

const AppComponent = () => (
  <div className="App">
    <AddForm />
    <Blocks />
    <UndoRedo />
  </div>
);


const store = createStore(
  airQualityApp,
  { locations: Locations },
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = () => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
);

export default App;

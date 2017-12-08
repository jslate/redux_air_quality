import { combineReducers } from 'redux';

import locations from './locations';
import blocks from './blocks';

const airQualityApp = combineReducers({
  locations,
  blocks,
});

export default airQualityApp;

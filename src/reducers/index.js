import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import locations from './locations';
import blocks from './blocks';

const airQuality = combineReducers({
  locations,
  blocks: undoable(blocks),
});

export default airQuality;

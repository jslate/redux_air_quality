import { ADD_BLOCK, REMOVE_BLOCK } from './../Actions';

let blockIdIncrementer = 3;

const blocks = (state = [], action) => {
  switch (action.type) {
    case ADD_BLOCK:
      blockIdIncrementer += 1;
      return [
        ...state,
        {
          id: blockIdIncrementer,
          locationId: action.location,
          exertion: action.exertion,
          time: action.time,
          minutes: action.minutes,
        },
      ];
    case REMOVE_BLOCK:
      return state.filter(block => block.id !== action.id);
    default:
      return state;
  }
};

export default blocks;

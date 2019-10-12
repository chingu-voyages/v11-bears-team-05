import { RECORD_COORDS } from '../actions/types';

const defaultState = {
  coords: []
};

const locationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECORD_COORDS:
      return {
        ...state,
        coords: action.payload
      };
      break;
    default:
      return state;
  }
};

export default locationReducer;

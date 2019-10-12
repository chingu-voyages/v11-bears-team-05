import { RECORD_COORDS } from '../actions/types';

const defaultState = {
  coords: []
};

const locationReducer = (state = defaultState, action) => {
  console.log('location reducer', action.payload);
  switch (action.type) {
    case RECORD_COORDS:
      return {
        ...state,
        coords: action.payload
      };
    default:
      return state;
  }
};

export default locationReducer;

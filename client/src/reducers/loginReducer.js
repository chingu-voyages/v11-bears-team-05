import { LOGIN, LOGOUT } from '../constants';

const defaultState = {
  loggedIn: false,
  userId: null
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userId: null
      };
    default:
      return state;
  }
};

export default loginReducer;

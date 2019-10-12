import { LOGIN, LOGOUT, RECORD_COORDS } from './types';

export const loginUser = data => {
  return {
    type: LOGIN,
    payload: data
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT
  };
};

export const recordCoords = coords => {
  return {
    type: RECORD_COORDS,
    payload: coords
  };
};

import { LOGIN, LOGOUT } from './types';

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

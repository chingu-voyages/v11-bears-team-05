import { createStore, combineReducers } from 'redux';
import loginReducer from './reducers/loginReducer';

const allReducers = combineReducers({ loginReducer });

const configureStore = () => {
  return createStore(allReducers);
};

export default configureStore;

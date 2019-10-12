import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';

const allReducers = combineReducers({ loginReducer });

const initialState = {};
const middleware = [thunk];

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  return createStore(
    allReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
};

export default configureStore;

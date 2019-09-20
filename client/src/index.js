import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import './styles/appStyle.scss';

const store = configureStore();

// will fire whenever state changes
const unsubscribe = store.subscribe( () => {
  console.log('New state is ', store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

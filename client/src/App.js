import React from 'react';
import { Route } from 'react-router-dom';
import CustomNavbar from './components/CustomNavbar/CustomNavbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Main from './components/Main/Main';
import NewEvent from './components/NewEvent/NewEvent';
import Event from './components/Event/Event';
import JoinEvent from './components/JoinEvent/JoinEvent';

import './App.css';

function App() {
  return (
    <div className='App'>
      <CustomNavbar />
      <div>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/main' component={Main} />
        <Route path='/new-event' component={NewEvent} />
        <Route path='/event/:id' component={Event} />
        <Route path='/join-event' component={JoinEvent} />
      </div>
    </div>
  );
}

export default App;

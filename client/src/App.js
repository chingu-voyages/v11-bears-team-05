import React from 'react';
import { Route } from 'react-router-dom';
import CustomNavbar from './components/CustomNavbar/CustomNavbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import './App.css';

function App() {
  return (
    <div className='App'>
      <CustomNavbar />
      <div>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
      </div>
    </div>
  );
}

export default App;

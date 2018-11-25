import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Style
import './App.css';

import LoginScreen from './app/screens/Login/LoginScreen';
import HomeScreen from './app/screens/Home/HomeScreen';
import VisioScreen from './app/screens/Visio/VisioScreen';
import TeachersScreen from './app/screens/Teachers/TeachersScreen';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/visio" component={VisioScreen} />
          <Route path="/teachers" component={TeachersScreen} />
          <Route exact path="/" component={HomeScreen} />
        </Switch>
      </BrowserRouter >
    );
  }
}

export default App;

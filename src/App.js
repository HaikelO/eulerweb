import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Style
import './App.css';

import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import VisioScreen from './app/screens/VisioScreen';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/visio" component={VisioScreen} />
          <Route exact path="/" component={HomeScreen} />
        </Switch>
      </BrowserRouter >
    );
  }
}

export default App;

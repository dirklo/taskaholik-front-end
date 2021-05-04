import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './components/Dashboard'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import withAuth from './components/auth/withAuth'
import Landing from './components/Landing'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/dashboard' component={withAuth(Dashboard)} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

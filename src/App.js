import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './components/pages/Dashboard'
import TeamPage from './components/pages/TeamPage'
import NewTeamPage from './components/pages/NewTeamPage'
import TeamSelectPage from './components/pages/TeamSelectPage'
import NewProjectPage from './components/pages/NewProjectPage'
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
            <Route exact path='/teams' component={withAuth(TeamPage)} />
            <Route exact path='/teams/new' component={withAuth(NewTeamPage)} />
            <Route exact path='/teams/select' component={withAuth(TeamSelectPage)} />
            <Route exact path='/projects/new' component={withAuth(NewProjectPage)} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

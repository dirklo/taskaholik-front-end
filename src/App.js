import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './components/pages/Dashboard'
import TeamPage from './components/pages/TeamPage'
import NewTeamPage from './components/pages/NewTeamPage'
import TeamSelectPage from './components/pages/TeamSelectPage'
import NewProjectPage from './components/pages/NewProjectPage'
import Signup from './components/auth/Signup'
import Logout from './components/auth/Logout'
import withAuth from './components/auth/withAuth'
import loadData from './components/auth/loadData'
import Landing from './components/pages/Landing'

export default class App extends Component {
  componentDidMount(){
    document.title = "Taskaholik"
  }

  render() {
    return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/dashboard' component={withAuth(loadData(Dashboard))} />
            <Route exact path='/teams' component={withAuth(loadData(TeamPage))} />
            <Route exact path='/teams/new' component={withAuth(NewTeamPage)} />
            <Route exact path='/teams/select' component={withAuth(loadData(TeamSelectPage))} />
            <Route exact path='/projects/new' component={withAuth(loadData(NewProjectPage))} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/logout' component={Logout} />
          </Switch>
        </Router>
      </div>
    );
  }
}

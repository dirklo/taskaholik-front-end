import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskContainer from '../containers/TaskContainer'
import ToolbarContainer from '../containers/ToolbarContainer'
import './Dashboard.css'
import { populateTeams, populateProjects, populateTasks}  from '../actions/populate'

class Dashboard extends Component {
    componentDidMount() {
        this.props.populateTeams(this.props.currentUser.id || this.props.currentUser.data.id)
        .then(() => this.props.populateProjects(this.props.teams[0].id))
        .then(() => this.props.populateTasks(this.props.projects[0].id))
    }

    render() {
        return (
            <div className='dashboard'>
                <TaskContainer />
                <ToolbarContainer />
            </div>
        )
    }
}

export default connect((state) => {
    return {
        currentUser: state.auth.currentUser, 
        teams: state.populate.teams,
        projects: state.populate.projects
    }
}, { populateTeams, populateProjects, populateTasks })(Dashboard)

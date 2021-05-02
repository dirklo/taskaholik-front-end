import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskContainer from '../containers/TaskContainer'
import ToolbarContainer from '../containers/ToolbarContainer'
import './Dashboard.css'
import { populateTeams }  from '../actions/team'
import { populateProjects }  from '../actions/project'
import { populateTasks}  from '../actions/task'

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
        teams: state.team.teams,
        projects: state.project.projects
    }
}, { populateTeams, populateProjects, populateTasks })(Dashboard)

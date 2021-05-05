import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskContainer from '../../containers/TaskContainer'
import ToolbarContainer from '../../containers/ToolbarContainer'
import './Dashboard.css'
import { populateProjects }  from '../../actions/project'
import { populateTasks}  from '../../actions/task'

class Dashboard extends Component {
    
    componentDidMount() {
        const currentTeam = this.props.teams.find(team => team.selected === true)
        this.props.populateProjects(currentTeam.id, 1)
        this.props.populateTasks(1, 1)
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
}, { populateTasks, populateProjects })(Dashboard)

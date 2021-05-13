import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import TaskContainer from '../../containers/TaskContainer'
import ToolbarContainer from '../../containers/ToolbarContainer'
import './Dashboard.css'
import { populateProjects }  from '../../actions/project'
import { populateTasks}  from '../../actions/task'
import { currentTeam } from '../../helpers/helpers'

function Dashboard({ populateProjects }) {

    useEffect(() => {
        populateProjects(currentTeam().id)
    }, [populateProjects])
        
    return (
        <div className='dashboard'>
            <TaskContainer />
            <ToolbarContainer />
        </div>
    )
}

export default connect((state) => {
    return {
        teams: state.team.teams,
        projects: state.project.projects
    }
}, { populateTasks, populateProjects })(Dashboard)

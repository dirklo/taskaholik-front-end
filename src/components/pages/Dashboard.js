import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskContainer from '../../containers/TaskContainer'
import ToolbarContainer from '../../containers/ToolbarContainer'
import './Dashboard.css'
import { populateProjects }  from '../../actions/project'
import { populateTasks}  from '../../actions/task'
import { currentTeam, currentProject} from '../../helpers/helpers'

class Dashboard extends Component {
    
    componentDidMount() {
        this.props.populateProjects(currentTeam().id, 1)
        .then(() => {
                if (currentProject()) {
                    this.props.populateTasks(currentProject().id, 1)
                }
        })
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

export default connect(null, { populateTasks, populateProjects })(Dashboard)

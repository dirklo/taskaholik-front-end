import React from 'react'
import { connect } from 'react-redux'
import './MobileDashboard.css'
import TeamToolbar from '../dashboard/TeamToolbar'
import TaskToolbar from './TaskToolbar'
import DetailsContainer from './DetailsContainer'
import DetailEditor from './DetailEditor'
import { currentTask, currentDetail } from '../../helpers/helpers'

function MobileDashboard() {
   
    return (
        <div className='mobile-dashboard'>
            <TeamToolbar />
            <br />
            <br />
            <TaskToolbar />
            { currentTask() ?
                <DetailsContainer />
            : null
            }
            { currentDetail() ?
                <DetailEditor />
            : null
            }
        </div>
    )
   
}

export default connect(state => {
    return {
        currentUser: state.auth.currentUser,
        tasks: state.task.tasks,
        details: state.detail.details
    }
})(MobileDashboard)
import React from 'react'
import { connect } from 'react-redux'
import './TaskWorkspace.css'
import DetailsColumn from './DetailsColumn'
import DetailEditor from './DetailEditor'
import { currentTask, currentDetail } from '../../helpers/helpers'

function TaskWorkspace() {

    if (currentTask()) {
        return (
            <section className='task-workspace'>
                {currentTask() ?
                    <DetailsColumn />
                : null
                }
                {currentDetail() ?
                    <DetailEditor />
                : null
                }
            </section>
        )
    } else {
        return (
            <section className='task-workspace'>
                <div className="no-task-placeholder">
                    <div className="logo"></div>
                </div>
            </section>
        )
    }
}

export default connect((state) => {
    return {
        details: state.detail.details,
        tasks: state.task.tasks
    }
})(TaskWorkspace)




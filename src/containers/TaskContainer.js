import React, { Component } from 'react'
import { connect } from 'react-redux'
import './TaskContainer.css'
import TopBar from '../components/TopBar'
import TaskCard from '../components/TaskCard'
import TaskWorkspace from '../components/TaskWorkspace'
import { setCurrentTask } from '../actions/task'
import { populateDetails } from '../actions/detail'

class TaskContainer extends Component {
    
    loadTask = (event) => {
        this.props.setCurrentTask(event.target.id)
        this.props.populateDetails(event.target.id)
        this.render()
    }

    render() {
        return (
            <div className='task-container'>
                <TopBar />
                <div className='task-fields'>
                    <section className='tasks-select'>
                        <h1>Project Goals:</h1>
                        {this.props.tasks.map(task => 
                            <TaskCard
                                key={task.id}
                                task={task}
                                loadTask={this.loadTask}
                            />
                        )}
                    </section>
                    <TaskWorkspace />
                </div>
            </div>
        )
    }
}


export default connect((state) => {
    return {
        tasks: state.task.tasks,
        taskComments: state.task.taskComments,
        details: state.detail.details,
        detailComments: state.detail.detailComments
    }
}, { setCurrentTask, populateDetails })(TaskContainer)

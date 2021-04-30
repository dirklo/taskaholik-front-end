import React, { Component } from 'react'
import { connect } from 'react-redux'
import './TaskContainer.css'
import TopBar from '../components/TopBar'
import TaskCard from '../components/TaskCard'
import TaskWorkspace from '../components/TaskWorkspace'
import { setCurrentTask, populateDetails } from '../actions/task'

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
                        {this.props.tasks.map(task => 
                            <TaskCard 
                                currentTask={this.props.currentTask} 
                                task={task} 
                                loadTask={this.loadTask}
                            />
                        )}
                    </section>
                    <section className='task-open'>
                        <TaskWorkspace />
                    </section>
                </div>
            </div>
        )
    }
}


export default connect((state) => {
    return {
        tasks: state.populate.tasks,
        currentTask: state.task.currentTask,
        taskComments: state.task.taskComments,
        details: state.task.details,
        detailComments: state.task.detailComments
    }
}, { setCurrentTask, populateDetails })(TaskContainer)

import React, { useState } from 'react'
import { connect } from 'react-redux'
import './TaskContainer.css'
import TopBar from '../components/TopBar'
import TaskCard from '../components/TaskCard'
import TaskWorkspace from '../components/TaskWorkspace'
import { setCurrentTask } from '../actions/task'
import { populateDetails } from '../actions/detail'
import NewTaskForm from '../components/NewTaskForm'

function TaskContainer(props) {

    const [showAddForm, setShowAddForm] = useState(false)

    return (
        <div className='task-container'>
            <TopBar />
            <div className='task-fields'>
                <section className='tasks-select'>
                    <h1>Project Goals:</h1>
                    {props.tasks.map(task => 
                        <TaskCard
                            key={task.id}
                            task={task}
                            loadTask={(e) => {
                                props.setCurrentTask(e.target.id)
                                props.populateDetails(e.target.id)
                            }}
                        />
                    )}
                    <button 
                        type='button'
                        className={!showAddForm ? '' : 'hide'}
                        onClick={(e) => setShowAddForm(true)}
                    >
                        + Add New Task
                    </button>
                    <button 
                        type='button'
                        className={showAddForm ? '' : 'hide'}
                        onClick={(e) => setShowAddForm(false)}
                    >
                        + Cancel
                    </button> 
                <NewTaskForm 
                    showAddForm={showAddForm} 
                    setShowAddForm={setShowAddForm}
                />
                </section>
                <TaskWorkspace />
            </div>
        </div>
    )
}


export default connect((state) => {
    return {
        tasks: state.task.tasks,
        taskComments: state.task.taskComments,
        details: state.detail.details,
        detailComments: state.detail.detailComments
    }
}, { setCurrentTask, populateDetails })(TaskContainer)

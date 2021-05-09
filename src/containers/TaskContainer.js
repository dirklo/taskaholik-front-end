import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './TaskContainer.css'
import TopBar from '../components/TopBar'
import TaskCard from '../components/TaskCard'
import TaskWorkspace from '../components/TaskWorkspace'
import NewTaskForm from '../components/NewTaskForm'
import { setCurrentTask } from '../actions/task'
import { populateDetails } from '../actions/detail'
import { currentProject, parseTimestamp } from '../helpers/helpers'
import { checkAuth } from '../actions/auth'

function TaskContainer({ tasks, setCurrentTask, populateDetails, checkAuth }) {

    const [showAddForm, setShowAddForm] = useState(false)
    const [redirect, setRedirect] = useState(false)

    return (
        <div className='task-container'>
            { redirect ? (<Redirect push to='./login' />) : null}
            <TopBar />
            <div className='task-fields'>
                {currentProject()? 
                    <section className='tasks-select'>
                        <div className="title">
                            <h1>{currentProject().title}</h1>
                            <h2>Deadline: {parseTimestamp(currentProject().deadline)}</h2>
                        </div>
                        <h1>Project Goals:</h1>
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
                        <br/> 
                        <NewTaskForm 
                            showAddForm={showAddForm} 
                            setShowAddForm={setShowAddForm}
                        />
                        {tasks.map(task => 
                            <TaskCard
                                key={task.id}
                                task={task}
                                loadTask={(e) => {
                                    checkAuth()
                                    .then(() => {
                                        setCurrentTask(e.target.id)
                                        populateDetails(e.target.id)
                                    })
                                    .catch(() => {
                                        setRedirect(true)
                                    })
                                }}
                            />
                        )}
                    </section>
                    :
                    <>
                    </>
                }   
                <TaskWorkspace />
            </div>
        </div>
    )
}


export default connect((state) => {
    return {
        tasks: state.task.tasks
    }
}, { setCurrentTask, populateDetails, checkAuth })(TaskContainer)

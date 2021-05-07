import React, { useState } from 'react'
import { connect } from 'react-redux'
import './TaskContainer.css'
import TopBar from '../components/TopBar'
import TaskCard from '../components/TaskCard'
import TaskWorkspace from '../components/TaskWorkspace'
import { setCurrentTask } from '../actions/task'
import { populateDetails } from '../actions/detail'
import NewTaskForm from '../components/NewTaskForm'
import { currentProject } from '../helpers/helpers'

function TaskContainer({ tasks, setCurrentTask, populateDetails }) {

    const [showAddForm, setShowAddForm] = useState(false)

    return (
        <div className='task-container'>
            <TopBar />
            <div className='task-fields'>
                {currentProject()? 
                    <section className='tasks-select'>
                        <h1>{currentProject().title}</h1>
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
                                    setCurrentTask(e.target.id)
                                    populateDetails(e.target.id)
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
}, { setCurrentTask, populateDetails })(TaskContainer)

import React from 'react'
import { connect } from 'react-redux'
import './TaskContainer.css'
import TopBar from '../components/TopBar'
import TaskCard from '../components/TaskCard'
import TaskWorkspace from '../components/TaskWorkspace'
import NewTaskForm from '../components/NewTaskForm'
import { setCurrentTask } from '../actions/task'
import { populateDetails } from '../actions/detail'
import { currentProject, parseTimestamp } from '../helpers/helpers'

function TaskContainer({ tasks, setCurrentTask, populateDetails }) {

    return (
        <div className='task-container'>
            <TopBar />
            <div className='task-fields'>
                {currentProject()? 
                    <section className='tasks-select'>
                        <div className="title">
                            <h1>{currentProject().title}</h1>
                            <h2>Deadline: {parseTimestamp(currentProject().deadline)}</h2>
                        </div>
                        <h1>Project Goals:</h1>
                        <NewTaskForm />
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
                    null
                }   
                <TaskWorkspace />
            </div>
        </div>
    )
}


export default connect((state) => {
    return {
        tasks: state.task.tasks,
        projects: state.project.projects
    }
}, { setCurrentTask, populateDetails })(TaskContainer)

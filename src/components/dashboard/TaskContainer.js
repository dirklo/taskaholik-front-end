import React, { useState } from 'react'
import { connect } from 'react-redux'
import './TaskContainer.css'
import TopBar from '../TopBar'
import TaskCard from '../cards/TaskCard'
import TaskWorkspace from '../dashboard/TaskWorkspace'
import NewTaskForm from '../forms/NewTaskForm'
import ErrorField from '../ErrorField'
import { setCurrentTask } from '../../actions/task'
import { populateDetails } from '../../actions/detail'
import { deleteProject } from '../../actions/project'
import { currentProject, parseTimestamp, currentTeam } from '../../helpers/helpers'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

function TaskContainer({ tasks, setCurrentTask, populateDetails, currentUser, deleteProject, loggedIn }) {

    const [error, setError] = useState('')

    return (
        <div className='task-container'>
            <TopBar />
            <div className='task-fields'>
                {currentProject()? 
                    <section className='tasks-select'>
                        {currentUser.id === currentProject().creator_id || 
                        currentUser.id === currentTeam().leader_id ?
                            <button 
                                type='button' 
                                className='delete-btn'
                                onClick={() => {
                                    deleteProject(currentProject().id, currentUser)
                                    .catch(error => setError(error))
                                }}
                            >
                                <DeleteOutline />
                            </button>
                        :
                            null
                        }
                        <div className="title">
                            <h1>{currentProject().title}</h1>
                            { currentProject().deadline ?
                                <h2>Deadline: {parseTimestamp(currentProject().deadline)}</h2>
                                :
                                null
                            }
                        </div>
                        {error ? 
                            <ErrorField 
                                error={error}
                                timeout="5000"
                                clearError={() => setError('')}
                            />
                            :
                            null
                        }
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
        projects: state.project.projects,
        currentUser: state.auth.currentUser,
        teams: state.team.teams,
        loggedIn: state.auth.loggedIn
    }
}, { setCurrentTask, populateDetails, deleteProject })(TaskContainer)

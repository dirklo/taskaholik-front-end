import React, { useState } from 'react'
import './TaskToolbar.css'
import { connect } from 'react-redux'
import { currentProject, currentTeam, parseTimestamp } from '../../helpers/helpers'
import { deleteProject } from '../../actions/project'
import { setCurrentTask } from '../../actions/task'
import { setCurrentDetail } from '../../actions/detail'
import { updateUserSelections } from '../../actions/auth'
import ErrorField from '../ErrorField'
import NewTaskForm from '../forms/NewTaskForm'
import TaskCard from '../cards/TaskCard'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

function TaskToolbar({ currentUser, setCurrentTask, setCurrentDetail, updateUserSelections, tasks }) {
    const [error, setError] = useState('')

    let currentTasks
    if (currentProject()) {
        currentTasks = [...tasks.filter(task => task.project_id === currentProject().id)]
    }
    return (
        <div>
            {currentProject() ?
                <div className='task-fields'>
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
                        {currentTasks.map(task => 
                            <TaskCard
                                key={task.id}
                                task={task}
                                loadTask={(e) => {
                                    setCurrentTask(Number(e.target.id))
                                    setCurrentDetail(null)
                                    updateUserSelections(currentUser.id)
                                }}
                            />
                        )}
                    </section>
                </div>
            : null
            }
        </div>
    )
}

export default connect(state => {
    return {
        currentUser: state.auth.currentUser,
        tasks: state.task.tasks
    }
}, { setCurrentTask, setCurrentDetail, updateUserSelections })(TaskToolbar)

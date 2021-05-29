import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './DetailsList.css'
import { setCurrentDetail } from '../../actions/detail'
import { deleteTask } from '../../actions/task'
import { currentTask, currentTeam } from '../../helpers/helpers'
import { updateUserSelections } from '../../actions/auth'
import ErrorField from '../ErrorField'
import NewDetailForm from '../forms/NewDetailForm'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import CheckCircle from '@material-ui/icons/CheckCircle'
import DeleteOutline from '@material-ui/icons/DeleteOutline'


function DetailsList({ details, setCurrentDetail, deleteTask, tasks, currentUser, updateUserSelections }) { 
    
    const [error, setError] = useState('')

    const currentDetails = [...details.filter(detail => detail.task_id === currentTask().id)]
    
    useEffect(() => {
        setError('')
    }, [tasks])
    
    const handleDeleteTask = (e) => {
        deleteTask(currentTask().id)
        .catch(error => {
            setError(error)
        })
    }
    if (currentTask()) {
        return (
            <section className='details-list'>
                <div className="detail-header">
                    <h2>{currentTask().title}</h2>
                    {currentUser.id === currentTeam().leader_id ||
                        currentUser === currentTask.creator ?
                            <button
                            className='delete-task-btn'
                            onClick={(e) => handleDeleteTask(e)}    
                            >
                                <DeleteOutline/>
                            </button>
                        : null
                    }
                </div>
                {error !== '' ? 
                    <ErrorField 
                    error={error}
                        timeout='5000'
                        clearError={() => setError('')} 
                        /> : null
                }
                <NewDetailForm />
                {currentDetails.map(detail =>
                    <div 
                    className={detail.selected? 'detail-card selected' : 'detail-card'}
                    key={detail.id}
                    data-id={detail.id}
                    onClick={e => {
                            setCurrentDetail(Number(e.target.dataset.id))
                            updateUserSelections(currentUser.id)
                        }}
                        >
                        <span 
                            key={detail.id}
                            className={detail.completed? 'checkmark completed' : 'checkmark'}
                            data-id={detail.id}
                            >
                            {detail.completed ? <CheckCircle /> : <CheckCircleOutline />}
                        </span>
                        <span className="detail-body">
                            {detail.content}
                        </span>
                    </div> 
                )}
            </section>
        ) 
    } else {
        return null
    }
}

export default connect((state) => {
    return {
        tasks: state.task.tasks,
        comments: state.task.taskComments,
        details: state.detail.details,
        currentUser: state.auth.currentUser
    }
}, { setCurrentDetail, deleteTask, updateUserSelections })(DetailsList)



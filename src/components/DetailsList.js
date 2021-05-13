import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './DetailsList.css'
import { setCurrentDetail } from '../actions/detail'
import { deleteTask } from '../actions/task'
import ErrorField from '../components/ErrorField'
import NewDetailForm from './NewDetailForm'
import { currentTask } from '../helpers/helpers'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import CheckCircle from '@material-ui/icons/CheckCircle'
import DeleteOutline from '@material-ui/icons/DeleteOutline'


function DetailsList({ details, setCurrentDetail, deleteTask, tasks }) { 
    
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
    }, [tasks])

    return (
        <section className='details-list'>
            <div className="detail-header">
                <h2>{currentTask().title}</h2>
                <button
                    className='delete-task-btn'
                    onClick={(e) => {
                        deleteTask(currentTask().id)
                        .catch(error => {
                            setError(error)
                        })
                    }}    
                    >
                    <DeleteOutline/>
                </button>
            </div>
            {error !== '' ? 
                <ErrorField 
                    error={error}
                    timeout='5000'
                    clearError={() => setError('')} 
                /> : null
            }
            <NewDetailForm />
            {details.map(detail =>
                <div 
                    className={detail.selected? 'detail-card selected' : 'detail-card'}
                    key={detail.id}
                    data-id={detail.id}
                    onClick={e => {
                        setCurrentDetail(
                            parseInt(e.target.dataset.id)
                        )
                    }}
                >
                    <span 
                        key={detail.id}
                        className={detail.completed? 'checkmark completed' : 'checkmark'}
                        data-id={detail.id}
                        onClick={e => {
                            setCurrentDetail(
                                parseInt(e.target.dataset.id)
                            )
                        }}
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
}

export default connect((state) => {
    return {
        tasks: state.task.tasks,
        comments: state.task.taskComments,
        details: state.detail.details,
    }
}, { setCurrentDetail, deleteTask })(DetailsList)



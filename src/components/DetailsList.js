import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './DetailsList.css'
import { setCurrentDetail } from '../actions/detail'
import { deleteTask } from '../actions/task'
import NewDetailForm from '../components/NewDetailForm'
import { currentTask } from '../helpers/helpers'
import { checkAuth } from '../actions/auth'


function DetailsList(props) {
    const [showAddForm, setShowAddForm] = useState(false)
    const [redirect, setRedirect] = useState(false)
    
    return (
        <section className='details-list'>
            { redirect ? (<Redirect push to='/login' />) : null }
            <h2>{currentTask().title}</h2>
            {props.details.map(detail => 
                <div 
                    key={detail.id}
                    className={detail.selected? 'detail-card selected' : 'detail-card'}
                    data-id={detail.id}
                    onClick={e => {
                        props.checkAuth()
                        .then(() => {
                            props.setCurrentDetail(
                                parseInt(e.target.dataset.id)
                            )
                        })
                        .catch(() => setRedirect(true))
                    }}
                >
                    {detail.content}
                </div>
            )}
            <button 
                className={!showAddForm ? 'show-form-btn show' : 'hide'}
                onClick={(e) => setShowAddForm(true)}
            >
                + Add New Detail
            </button>
            <button 
                type='button'
                className={showAddForm ? 'show' : 'hide'}
                onClick={(e) => setShowAddForm(false)}
                >
                + Cancel
            </button> 
            <NewDetailForm 
                showAddForm={showAddForm} 
                setShowAddForm={setShowAddForm} 
                />
            <button
                className='delete-task-btn'
                onClick={(e) => props.deleteTask(currentTask.id)}    
                >
                Delete This Goal
            </button>
        </section>
    ) 
}

export default connect((state) => {
    return {
        tasks: state.task.tasks,
        comments: state.task.taskComments,
        details: state.detail.details,
    }
}, { setCurrentDetail, deleteTask, checkAuth })(DetailsList)



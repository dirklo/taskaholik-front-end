import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import './NewDetailForm.css'
import { connect } from 'react-redux'
import { addDetail } from '../actions/detail'
import { currentTask } from '../helpers/helpers'
import { checkAuth } from '../actions/auth'
import Close from '@material-ui/icons/Close'

function NewDetailForm({ currentUser, addDetail, checkAuth }) {

    const [content, setContent] = useState('')
    const [deadline, setDeadline] = useState(Date.now())
    const [redirect, setRedirect] = useState(false)
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="new-detail-form">
            { redirect ? (<Redirect push to="/login" />) : null }
            { showForm ? 
                <> 
                    <button 
                        type='button'
                        className="cancel-btn"
                        onClick={(e) => setShowForm(false)}
                    >
                        <Close />
                    </button>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            checkAuth()
                            .then(() => {
                                addDetail(content, currentTask(), currentUser, deadline)
                                setContent('')
                                setShowForm(false)
                            })
                            .catch(() => {
                                setRedirect(true)
                            })
                        }}
                    >
                        <label htmlFor="add-detail">
                            Description:
                        </label>
                        <br/>
                        <input 
                            type="text"
                            id="add-detail"
                            value={content}
                            placeholder='Description'
                            onChange={(e) => setContent(e.target.value)}
                            />
                        <br/>
                        <label htmlFor="deadline"> Deadline:</label>
                        <br/>
                        <input 
                            type="datetime-local"
                            id="deadline"
                            value={deadline}
                            onChange={e => setDeadline(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <input type="submit" value="Add Detail"/>
                    </form>
                </>
            :
                <button 
                    className='show-form-btn'
                    onClick={(e) => setShowForm(true)}
                >
                    + Add New Detail
                </button>
            }
        </div>
    )
}

export default connect((state) => {
    return {
       currentUser: state.auth.currentUser
    }
}, { addDetail, checkAuth } )(NewDetailForm)



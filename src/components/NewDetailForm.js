import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import './NewDetailForm.css'
import { connect } from 'react-redux'
import { addDetail } from '../actions/detail'
import { currentTask } from '../helpers/helpers'
import { checkAuth } from '../actions/auth'

function NewDetailForm({ currentUser, addDetail, checkAuth, showAddForm, setShowAddForm }) {

    const [content, setContent] = useState('')
    const [deadline, setDeadline] = useState(Date.now())
    const [redirect, setRedirect] = useState(false)

    return (
        <div 
            className={showAddForm ? 
                "new-detail-form show" 
                : 
                "new-detail-form"
        }>
            { redirect ? (<Redirect push to="/login" />) : null}
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    checkAuth()
                    .then(() => {
                        addDetail(content, currentTask(), currentUser, deadline)
                        setContent('')
                        setShowAddForm(false)
                    })
                    .catch(() => {
                        setRedirect(true)
                    })
                }}
                >
            <label htmlFor="add-new-detail">
                Add New Detail
            </label>
            <br/>
            <input 
                type="text"
                id="add-new-detail"
                value={content}
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
            <span>User: {currentUser.username}</span>
            </form>
        </div>
    )
}

export default connect((state) => {
    return {
       currentUser: state.auth.currentUser
    }
}, { addDetail, checkAuth } )(NewDetailForm)



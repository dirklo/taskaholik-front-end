import React, { useState } from 'react'
import './NewDetailForm.css'
import { connect } from 'react-redux'
import { addDetail } from '../actions/detail'

function NewDetailForm(props) {

    const [content, setContent] = useState('')

    return (
        <div className={props.showAddForm ? "new-detail-form show" : "new-detail-form"}>
            <form
                onSubmit={(e) => {
                    let currentTask = props.tasks.find(task => task.selected === true)
                    e.preventDefault()
                    props.addDetail(content, currentTask)
                    setContent('')
                    props.setShowAddForm(false)
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
            <input type="submit" value="Add Detail"/>
            <span>User: {props.currentUser.username}</span>
            </form>
        </div>
    )
}

export default connect((state) => {
    return {
       currentUser: state.auth.currentUser,
       tasks: state.task.tasks
    }
}, { addDetail } )(NewDetailForm)



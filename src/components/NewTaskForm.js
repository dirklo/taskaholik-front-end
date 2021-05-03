import React, { useState } from 'react'
import './NewTaskForm.css'
import { connect } from 'react-redux'
import { addTask } from '../actions/task'

function NewTaskForm(props) {

    const [title, setTitle] = useState('')

    return (
        <div className={props.showAddForm ? "new-task-form" : "new-task-form hide"}>
            <form
                onSubmit={(e) => {
                    let currentProject = props.projects.find(project => project.selected === true)
                    e.preventDefault()
                    props.addTask(title, currentProject, props.currentUser)
                    setTitle('')
                    props.setShowAddForm(false)
                }}
                >
            <label htmlFor="add-new-task">
                Add New Task
            </label>
            <br/>
            <input 
                type="text"
                id="add-new-task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            <br/>
            <input type="submit" value="Add Task"/>
            <span>User: {props.currentUser.username}</span>
            </form>
        </div>
    )
}

export default connect((state) => {
    return {
       currentUser: state.auth.currentUser,
       projects: state.project.projects
    }
}, { addTask } )(NewTaskForm)



import React, { useState } from 'react'
import "./AddProjectForm.css"
import { connect } from 'react-redux'
import { addProject } from '../actions/project' 
import { currentTeam } from '../helpers/helpers'

function AddProjectForm({ addProject, currentUser, showOverlay, setShowOverlay }) {
    const [title, setTitle] = useState('')
    const [deadline, setDeadline] = useState(Date.now())

    return (
        <div className={showOverlay ? "add-project-form show" : "add-project-form hide"}>
            <form 
                action=""
                onSubmit={(e) => {
                    e.preventDefault()
                    addProject(title, currentTeam(), currentUser, deadline)
                    setShowOverlay(false)
                }}
            >   
                <label htmlFor="title">Project Name:</label> 
                <br/>
                <input 
                    type="text" 
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <br/>
                <br/>
                <label htmlFor="deadline">Deadline:</label>
                <br/>
                <input 
                    type="datetime-local" 
                    id="deadline" 
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                />
                <br/>
                <br/>
                <input type="submit" value="Create Project"/>
            </form>
        </div>
    )
}

export default connect((state) => {
    return {
        currentUser: state.auth.currentUser
    }
}, { addProject })(AddProjectForm)
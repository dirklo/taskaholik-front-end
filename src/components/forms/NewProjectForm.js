import React, { useState } from 'react'
import "./NewProjectForm.css"
import { connect } from 'react-redux'
import { addProject } from '../../actions/project' 
import { currentTeam } from '../../helpers/helpers'
import { updateUserSelections } from '../../actions/auth'

function AddProjectForm({ addProject, currentUser, showOverlay, setShowOverlay }) {
    const [title, setTitle] = useState('')
    const [deadline, setDeadline] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        addProject(title, currentTeam(), currentUser, deadline)
        updateUserSelections(currentUser.id)
        setTitle('')
        setDeadline('')
        setShowOverlay(false)
    }

    return (
        <div className={showOverlay ? "new-project-form show" : "new-project-form hide"}>
            <form 
                action=""
                onSubmit={(e) => handleSubmit(e)}
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
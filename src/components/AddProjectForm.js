import React, { useState } from 'react'
import "./AddProjectForm.css"
import { connect } from 'react-redux'
import { addProject } from '../actions/project' 

function AddProjectForm(props) {
    const [title, setTitle] = useState('')
    let currentTeam = props.teams.find(team => team.selected === true)

    return (
        <div className={props.showOverlay ? "add-project-form show" : "add-project-form hide"}>
            <form 
                action=""
                onSubmit={(e) => {
                    e.preventDefault()
                    props.addProject(title, currentTeam, props.currentUser)
                    props.setShowOverlay(false)
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
                <input type="submit" value="Create Project"/>
            </form>
        </div>
    )
}

export default connect((state) => {
    return {
        currentUser: state.auth.currentUser,
        teams: state.team.teams
    }
}, { addProject })(AddProjectForm)
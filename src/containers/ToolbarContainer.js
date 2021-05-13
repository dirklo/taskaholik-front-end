import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './ToolbarContainer.css'
import AddProjectForm from '../components/AddProjectForm'
import { setCurrentProject } from '../actions/project'
import { populateTasks } from '../actions/task'
import { currentTeam } from '../helpers/helpers'

function ToolbarContainer({ projects, setCurrentProject, populateTasks }) {

    const [showOverlay, setShowOverlay] = useState(false)

    return (
        <div className='toolbar-container'>
            <div 
                className={showOverlay ? 'overlay show' : 'overlay hide'}
                onClick={() => setShowOverlay(false)}
            ></div>
            <AddProjectForm 
                showOverlay={showOverlay} 
                setShowOverlay={setShowOverlay}/>
            <h1>Team:</h1>
            <h2>{currentTeam().name}</h2>
            
            <br/>
            <Link to='/teams'>Manage Teams</Link>
            <br/>
            <hr/>
            <h2>Projects:</h2>
            <button 
                type='button' 
                className='addProjectBtn'
                onClick={() => {
                    setShowOverlay(true) 
                }}
            >
                Start New Project
            </button>
            <br/>
            {projects.length > 0 ?
                projects.map(project => 
                    <div 
                    key={project.id}
                    className={project.selected ? "project-card selected" : "project-card"}
                    onClick={() => {
                        setCurrentProject(project.id)
                        populateTasks(project.id)
                    }}
                    >
                        {project.title}
                    </div>
                )
            : null
            } 
        </div>
    )
}

export default connect((state) => {
    return {
        projects: state.project.projects
    }
}, { setCurrentProject, populateTasks })(ToolbarContainer)

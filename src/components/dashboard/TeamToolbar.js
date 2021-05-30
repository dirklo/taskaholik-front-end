import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import './TeamToolbar.css'
import NewProjectForm from '../forms/NewProjectForm'
import { updateUserSelections } from '../../actions/auth'
import { setCurrentProject } from '../../actions/project'
import { setCurrentTask } from '../../actions/task'
import { setCurrentDetail } from '../../actions/detail'
import { currentTeam } from '../../helpers/helpers'
import { clearTeam } from '../../actions/team'

function ToolbarContainer({ 
    projects, 
    setCurrentProject, 
    setCurrentTask, 
    setCurrentDetail,
    clearTeam,
    updateUserSelections, 
    currentUser 
}) {

    const [showOverlay, setShowOverlay] = useState(false)

    const history = useHistory()

    return (
        <div className='team-toolbar'>
            <div 
                className={showOverlay ? 'overlay show' : 'overlay hide'}
                onClick={() => setShowOverlay(false)}
            ></div>
            <NewProjectForm 
                showOverlay={showOverlay} 
                setShowOverlay={setShowOverlay}/>
            <h1>Team:</h1>
            <h2>{currentTeam().name}</h2>
            
            <br/>
            <button 
                type='button'
                onClick={() => {
                    setCurrentProject(null)
                    setCurrentTask(null)
                    setCurrentDetail(null)
                    updateUserSelections(currentUser.id)
                    clearTeam()
                    history.push('./teams')
                }}
            >
                Manage Teams
            </button>
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
                        setCurrentTask(null)
                        setCurrentDetail(null)
                        updateUserSelections(currentUser.id)
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
        projects: state.project.projects,
        currentUser: state.auth.currentUser
    }
}, { 
    setCurrentProject, 
    setCurrentTask, 
    setCurrentDetail,
    clearTeam,
    updateUserSelections 
})(ToolbarContainer)

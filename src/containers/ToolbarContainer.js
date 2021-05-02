import React from 'react'
import { connect } from 'react-redux'
import './ToolbarContainer.css'

function ToolbarContainer({ teams, projects }) {
    return (
        <div className='toolbar-container'>
            <h1>Teams:</h1>
            <ul>
                {teams.map(team => <li key={team.id}>{team.name}</li>)}
            </ul>
            <h2>Projects:</h2>
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>
        </div>
    )
}

export default connect((state) => {
    return {
        teams: state.team.teams,
        projects: state.project.projects
    }
})(ToolbarContainer)

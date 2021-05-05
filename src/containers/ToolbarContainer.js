import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './ToolbarContainer.css'

function ToolbarContainer({ teams, projects }) {
    let currentTeam = teams.find(team => team.selected === true)
    return (
        <div className='toolbar-container'>
            <h1>Team:</h1>
            <h2>{currentTeam.name}</h2>
            
            <br/>
            <Link to='/teams'>Manage Teams</Link>
            <hr/>
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

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './TeamSelectPage.css'
import { populateTeams } from '../../actions/team'
import TeamCard from '../TeamCard'

function TeamSelectPage({teams, populateTeams, currentUser }) {
    useEffect(() => {
        populateTeams(currentUser.id || currentUser.data.id, 
        1)
    }, [populateTeams, currentUser])

    return (
        <div className='team-select'>
            <div className="team-card-container">
                <h2 className="title">Click to load team Dashboard:</h2>
                {teams.map(team => <TeamCard key={team.id} team={team}/>)}
            </div>
        </div>
    )
}

export default connect((state) => {
    return {
        teams: state.team.teams,
        currentUser: state.auth.currentUser
    }
}, { populateTeams })(TeamSelectPage)

import React from 'react'
import './TeamCard.css'


function TeamCard({ team, selectTeam }) {
    
    return (
        <fieldset 
            className='team-card'
            onClick={() => {
                selectTeam()
            }}
        >
            <h2>
                {team.name}
            </h2>
        </fieldset>
    )
}

export default TeamCard

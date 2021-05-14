import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom' 
import './TeamCard.css'
import { setCurrentTeam } from '../../actions/team'

function TeamCard(props) {
    
    let history = useHistory()

    return (
        <fieldset 
            className='team-card'
            onClick={() => {               
                props.setCurrentTeam(props.team.id)
                history.push('/dashboard')
            }}
        >
            <h2>
                {props.team.name}
            </h2>
        </fieldset>
    )
}

export default connect(null, { setCurrentTeam })(TeamCard)

import React, { useState } from 'react'
import { connect } from 'react-redux'
import './NewTeamPage.css'
import { addTeam } from '../../actions/team'

function NewTeamPage(props) {
    const [teamName, setTeamName] = useState('')

    return (
        <div className='new-team-page'>
            <form 
            action=""
            onSubmit={e => {
                e.preventDefault()
                props.addTeam(teamName, props.currentUser.id)
                .then(res => props.history.push('/dashboard'))
            }}
            >
                <h1>Create a New Team:</h1>
                <label htmlFor='team-name'>Team Name:</label>
                <br/>
                <input 
                    type='text' 
                    id='team-name'
                    onChange={e => {setTeamName(e.target.value)}}
                    value={teamName}
                />
                <input type="submit" value='Create Team'/>
            </form>
        </div>
    )
}

export default connect((state) =>{
    return {
        currentUser: state.auth.currentUser
    }
}, { addTeam })(NewTeamPage)

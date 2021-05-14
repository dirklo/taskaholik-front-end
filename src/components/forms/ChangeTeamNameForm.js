import React, { useState } from 'react'
import './ChangeTeamNameForm.css'
import { connect } from 'react-redux'
import { currentTeam } from '../../helpers/helpers'
import { updateTeam } from '../../actions/team' 

function ChangeTeamNameForm({ updateTeam }) {

    const [teamName, setTeamName] = useState(currentTeam().name)

    return (
        <div className="change-team-name-form">
            <h2>Settings:</h2>
            <h3>Update Team Name:</h3>
            <form 
                action=""
                onSubmit={e => {
                    e.preventDefault()
                    updateTeam(currentTeam().id, {name: teamName})
                }}
            >
                <input 
                    type="text"
                    value={teamName}
                    onChange={(e) => {
                        setTeamName(e.target.value)
                    }}
                />
                <input type="submit" value="Update Name"/>
            </form>
        </div>
    )
}

export default connect(null, { updateTeam })(ChangeTeamNameForm)
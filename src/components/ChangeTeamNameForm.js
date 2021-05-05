import React, { useState } from 'react'
import './ChangeTeamNameForm.css'

export default function ChangeTeamNameForm(props) {

    const [teamName, setTeamName] = useState(props.currentTeam.name)

    return (
        <div className="change-team-name-form">
            <h2>Settings:</h2>
            <h3>Update Team Name:</h3>
            <form action="">
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

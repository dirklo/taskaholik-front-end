import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import './TeamSelectPage.css'
import TeamCard from '../cards/TeamCard'
import TopBar from '../TopBar'
import { setCurrentTeam, clearTeam } from '../../actions/team'
import { updateUserSelections } from '../../actions/auth'

function TeamSelectPage({ 
    teams,
    setCurrentTeam,
    updateUserSelections,
    currentUser
}) {

    const history = useHistory()

    const handleSelectTeam = (team) => {           
        setCurrentTeam(team.id)
        updateUserSelections(currentUser.id)
        history.push('/dashboard')
    }

    useEffect(() => {
        setCurrentTeam(null)
        updateUserSelections(currentUser.id)
    }, [currentUser.id, updateUserSelections, setCurrentTeam])

    return (
        <div className='team-select'>
            <TopBar />
            {teams.length > 0 ?
            <>
                <div className="team-card-container">
                    <h2 className="title">Click to load team Dashboard:</h2>
                    {teams.map(team => 
                        <TeamCard 
                            key={team.id} 
                            team={team}
                            selectTeam={() => handleSelectTeam(team)}
                        />
                    )}
                </div>
                <Link to='./new'>Create A New Team</Link>
            </>
            :
            <>
                <h2>You don't have any teams yet!</h2>
                <Link to='./new'>Create Your First Team</Link>
            </>
            }
        </div>
    )
}

export default connect((state) => {
    return {
        teams: state.team.teams,
        currentUser: state.auth.currentUser
    }
}, { setCurrentTeam,
    clearTeam, 
    updateUserSelections 
})(TeamSelectPage)

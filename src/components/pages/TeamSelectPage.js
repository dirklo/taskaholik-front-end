import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './TeamSelectPage.css'
import { populateTeams } from '../../actions/team'
import TeamCard from '../cards/TeamCard'
import TopBar from '../TopBar'

function TeamSelectPage({teams, populateTeams, currentUser }) {
    // useEffect(() => {
    //     populateTeams(currentUser.id || currentUser.data.id, 
    //     1)
    // }, [populateTeams, currentUser])

    return (
        <div className='team-select'>
            <TopBar />
            {teams.length > 0 ?
            <>
                <div className="team-card-container">
                    <h2 className="title">Click to load team Dashboard:</h2>
                    {teams.map(team => <TeamCard key={team.id} team={team}/>)}
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
}, { populateTeams })(TeamSelectPage)

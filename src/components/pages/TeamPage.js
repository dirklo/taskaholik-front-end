import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './TeamPage.css'
import MemberCard from '../MemberCard'
import AddMemberForm from '../AddMemberForm'

function TeamPage({ teams, currentUser }) {
    let currentTeam = teams.find(team => team.selected === true)
    return (
        <div className='team-page'>
            <section className="title">
                <h1>{currentTeam? currentTeam.name : 'No Team Loaded'}</h1>
                <Link to="/teams/select">Select Team</Link>
            </section>
            <section className="team-options">
                <div className="members">
                    <h2>Leader:</h2>
                    <MemberCard 
                        member={currentTeam.leader} 
                        removable='false' 
                    />
                    <h2>Members:</h2>
                    {currentTeam.members.map(member => 
                        <MemberCard 
                        member={member} 
                        removable={currentUser.id === currentTeam.leader.id ? 
                            'true' : 'false'} 
                        />
                    )}
                <AddMemberForm currentTeam={currentTeam} />
                </div>
                <div className="settings">
                    SETTINGS
                </div>
            </section>

        </div>
    )
}

export default connect((state => {
    return {
        teams: state.team.teams,
        currentUser: state.auth.currentUser
    }
}))(TeamPage)
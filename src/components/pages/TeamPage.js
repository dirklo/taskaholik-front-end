import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './TeamPage.css'
import { currentTeam } from '../../helpers/helpers'
import { setCurrentProject } from '../../actions/project'
import { setCurrentTask } from '../../actions/task'
import { setCurrentDetail } from '../../actions/detail'
import MemberCard from '../cards/MemberCard'
import AddMemberForm from '../forms/AddMemberForm'
import ChangeTeamNameForm from '../forms/ChangeTeamNameForm'

function TeamPage({ currentUser, setCurrentProject, setCurrentTask, setCurrentDetail }) {

    useEffect(() => {
        setCurrentProject(null, currentUser.id)
        setCurrentTask(null, currentUser.id)
        setCurrentDetail(null, currentUser.id)
    }, [currentUser, setCurrentProject, setCurrentTask, setCurrentDetail])

    return (
        <div className='team-page'>
            <section className="title">
                <h1>{currentTeam() ? currentTeam().name : 'No Team Loaded'}</h1>
                <Link to="/teams/select">Select Team</Link>
                <Link to="/dashboard">Dashboard</Link>
            </section>
            {currentTeam() ? 
                <section className="team-options">
                    <div className="members">
                        <h2>Leader:</h2>
                        <MemberCard 
                            member={currentTeam().leader} 
                            removable='false' 
                        />
                        <h2>Members:</h2>
                        {currentTeam().members.map(member => 
                            <MemberCard
                                key={member.id} 
                                member={member} 
                                removable={currentUser.id === currentTeam().leader.id ? 
                                    'true' : 'false'} 
                            />
                        )}
                    <AddMemberForm />
                    </div>
                    <div className="settings">
                        <ChangeTeamNameForm />
                    </div>
                </section>
            : null
            }
        </div>
    )

}

export default connect((state => {
    return {
        teams: state.team.teams,
        currentUser: state.auth.currentUser
    }
}), { setCurrentProject, setCurrentTask, setCurrentDetail })(TeamPage)
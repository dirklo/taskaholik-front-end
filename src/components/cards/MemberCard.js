import React from 'react'
import { connect } from 'react-redux'
import './MemberCard.css'
import { removeMember } from '../../actions/team'

function MemberCard(props) {
    let currentTeam = props.teams.find(team => team.selected === true) 
    return (
        <div className='member-card'>
            <div className='name-div'>
                <div className='avatar'>
                    {props.member.username[0]}
                </div>
                <h2>{props.member.username}</h2>
            </div>
            <h3 className='email'>{props.member.email}</h3>
            {props.removable === 'true' ? 
                <button
                    className='delete-member-button'
                    type='button'
                    onClick={(e) => {
                        window.confirm(`Are You Sure You Want To Remove ${props.member.username} from the team?`) &&
                        props.removeMember(props.member.id, currentTeam.id)
                    }}
                >
                    X
                </button>
            :
                null
            }
        </div>
    )
}

export default connect((state) => {
    return {
        teams: state.team.teams
    }
}, { removeMember })(MemberCard)

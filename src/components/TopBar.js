import React from 'react'
import { connect } from 'react-redux'
import './TopBar.css'
import { logoutUser } from '../actions/auth'

function TopBar({ username, logoutUser }) {
    return (
        <div className='top-bar'>
            Welcome back, {username}
            <button onClick={logoutUser}>LOGOUT</button>
        </div>
    )
}

export default connect((state) => {
    return {
        username: state.auth.currentUser.username
    }
}, {logoutUser})(TopBar)



import React from 'react'
import { connect } from 'react-redux'
import './TopBar.css'
import Logout from '../components/auth/Logout'

function TopBar({ username }) {
    return (
        <div className='top-bar'>
            <div className="logo"></div>
            <h3>askaholik</h3>
            <h2>
                Welcome back, {username}
            </h2>
            <Logout />
        </div>
    )
}

export default connect((state) => {
    return {
        username: state.auth.currentUser.username
    }
})(TopBar)



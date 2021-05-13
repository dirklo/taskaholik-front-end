import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function AuthChecker (WrappedComponent) {
    return (loggedIn) => {
        if (!loggedIn) {
            return (
                <>
                    <Redirect to='/login' />
                </>
            )
        } else {
            return WrappedComponent
        }
    }
}

export default connect((state) => {
    return {
        loggedIn: state.auth.loggedIn
    }
})(AuthChecker)




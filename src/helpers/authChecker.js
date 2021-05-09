import React from 'react'
import { Redirect } from 'react-router-dom'
// import { checkAuth } from '../actions/auth'
// import store from '../store'

export default function authChecker() {
    return (
        <>
            <Redirect to='/login' />
        </>
    )
}


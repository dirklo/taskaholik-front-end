import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Landing.css'

export default class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <h1>WELCOME TO TASKAHOLIK</h1>
                <div className="links">
                    <Link to="/login">LOGIN</Link>
                    <Link to="/signup">SIGN UP</Link>
                </div>
            </div>
        )
    }
}

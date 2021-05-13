import React, { Component } from 'react'
import './ErrorField.css'

export default class ErrorField extends Component {
    
    componentDidMount() {
        if (this.props.timeout) {
            this.timer = setInterval(
                this.props.clearError,
                parseInt(this.props.timeout)
            )
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div className="error-field">
                <p>{this.props.error}</p>
                <button 
                    className="dismiss"
                    onClick={() => {
                        this.props.clearError()
                        clearInterval(this.timer)
                    }}
                >
                    X
                </button>
            </div>
        )
    } 
}




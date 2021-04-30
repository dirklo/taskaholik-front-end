import React, { Component } from 'react'
import { connect } from 'react-redux'
import './NewCommentForm.css'
import { addTaskComment } from '../actions/task'

class NewCommentForm extends Component {
    constructor() {
        super();
        this.state = {
            content: ''
        }
    }

    handleOnChange = (e) => {
        this.setState(
            {content: e.target.value}
        )
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        this.props.addTaskComment(
            this.props.taskId, 
            this.state.content,  
            this.props.currentUser.id, 
            this.props.currentUser.username 
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <input 
                        type='text' 
                        name='content' 
                        value={this.state.content}
                        onChange={this.handleOnChange}
                    >
                    </input>
                    <input type='submit' value="Post Comment"/>
                    <br/>
                    <span>Posting as {this.props.currentUser.username}</span>
                </form>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        currentUser: state.auth.currentUser
    }
}, { addTaskComment })(NewCommentForm)



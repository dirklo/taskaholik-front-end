import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewCommentForm from './NewCommentForm'
import { removeTaskComment } from '../actions/task'
import DetailsContainer from '../containers/DetailsContainer'
import './TaskWorkspace.css'

class TaskWorkspace extends Component {
    deleteButton = (comment) => {
        if (this.props.currentUser.id === comment.author_id) {
            return <button 
                type='button'
                data-id={comment.id}
                onClick={this.handleDelete}
            >
                Delete Comment
            </button>
        }else{
            return null
        }
    }

    handleDelete = (e) => {
        this.props.removeTaskComment(e.target.dataset.id)
    }
    
    render() {
        return (
            <section className='task-workspace'>
                <DetailsContainer />
                <h2>Comments:</h2>
                <ul>
                    {this.props.comments.map(comment =>
                        <div key={comment.id}>
                            <h3>{comment.author} said:</h3>
                            <li>{comment.content}</li>
                            <p>at: {comment.created_at}</p>
                            {this.deleteButton(comment)}
                        </div>
                    )}
                </ul>
                <NewCommentForm taskId={this.props.taskId} />
            </section>
        )
    }
}

export default connect((state) => {
    return {
        comments: state.task.taskComments,
        currentUser: state.auth.currentUser
    }
}, { removeTaskComment })(TaskWorkspace)

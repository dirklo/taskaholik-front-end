import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewCommentForm from './NewCommentForm'
import { removeTaskComment } from '../actions/task'
import DetailsContainer from '../containers/DetailsContainer'
import CommentCard from '../components/CommentCard'
import './TaskWorkspace.css'

class TaskWorkspace extends Component {
    render() {
        return (
            <section className='task-workspace'>
                <DetailsContainer />
                <div className='task-comments'>
                    <h2>Comments:</h2>
                    {this.props.comments.map(comment =>
                        <CommentCard key={comment.id} comment={comment} />
                    )}
                <NewCommentForm taskId={this.props.taskId} />
                </div>
            </section>
        )
    }
}

export default connect((state) => {
    return {
        comments: state.task.taskComments,
    }
}, { removeTaskComment })(TaskWorkspace)

import React from 'react'
import { connect } from 'react-redux'
import NewCommentForm from './NewCommentForm'
import { removeTaskComment } from '../actions/task'
import DetailsContainer from '../containers/DetailsContainer'
import CommentCard from '../components/CommentCard'
import './TaskWorkspace.css'

function TaskWorkspace(props) {

    return (
        <section className='task-workspace'>
            <DetailsContainer />
            <div className='task-comments'>
                <h2>Comments:</h2>
                {props.comments.map(comment =>
                    <CommentCard key={comment.id} comment={comment} />
                )}
            <NewCommentForm />
            </div>
        </section>
    )

}

export default connect((state) => {
    return {
        comments: state.task.taskComments,
    }
}, { removeTaskComment })(TaskWorkspace)

import React from 'react'
import { connect } from 'react-redux'
import NewCommentForm from './NewCommentForm'
import { removeTaskComment } from '../actions/task'
import DetailsContainer from '../containers/DetailsContainer'
import CommentCard from '../components/CommentCard'
import './TaskWorkspace.css'

function TaskWorkspace(props) {
    let currentTask = props.tasks.find(task => task.selected === true)

    if (currentTask) {
        return (
            <section className='task-workspace'>
                <DetailsContainer />
                <div className='task-comments'>
                    <h2>Comments:</h2>
                    <NewCommentForm commentType='task' />
                    <div className='comment-container'>
                        {props.comments.map(comment =>
                            <CommentCard 
                            key={comment.id} 
                            comment={comment} 
                            commentType="task" 
                            />
                        )}
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <section className='task-workspace'>
                <div className="no-task-placeholder">
                    <div className="logo">LOGO</div>
                </div>
            </section>
        )
    }

}

export default connect((state) => {
    return {
        comments: state.task.taskComments,
        tasks: state.task.tasks,
    }
}, { removeTaskComment })(TaskWorkspace)

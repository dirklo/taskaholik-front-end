import React from 'react'
import { connect } from 'react-redux'
import './DetailsColumn.css'
import { checkAuth } from '../actions/auth'
import NewCommentForm from '../components/NewCommentForm'
import CommentCard from '../components/CommentCard'
import DetailsList from '../components/DetailsList'


function DetailsColumn({ comments }) {
    
    return (
        <section className='details-column'>
            <DetailsList />
            <br/>
            <br/>
            <section className='task-comments'>
                <NewCommentForm commentType='task' />
                <div className='comment-container'>
                    {comments.map(comment =>
                        <CommentCard 
                        key={comment.id} 
                        comment={comment} 
                        commentType="task" 
                        />
                    )}
                </div>
            </section>
        </section>
    ) 
}

export default connect((state) => {
    return {
        comments: state.task.taskComments
    }
}, { checkAuth })(DetailsColumn)



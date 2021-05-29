import React from 'react'
import './CommentCard.css'
import { connect } from 'react-redux'
import { parseTimestamp } from '../../helpers/helpers'
import Delete from '@material-ui/icons/Delete'
import ChatBubble from '@material-ui/icons/ChatBubble'

function CommentCard({ comment, currentUser, commentType, deleteComment, removeDetailComment }) {

    return (
        <div className="comment-card">
            <div key={comment.id} className={commentType === 'task' ? 'comment-body task' : 'comment-body detail'}>
                    {currentUser.id === comment.author_id ?
                        <div 
                            className='delete-btn'
                            data-id={comment.id}
                            onClick={(e) => deleteComment(e.target.dataset.id)}
                        >
                            <Delete className='delete-icon' />
                        </div>
                    :
                        null
                    }
                <span className='comment-content'>{comment.content}</span>
                <span className='timestamp'>{parseTimestamp(comment.created_at)}</span>
            </div>
            <div className="author-div">
                <ChatBubble/>
                <span>{comment.author.username}</span>
            </div>
        </div>
    )

}

export default connect((state) => {
    return {
        currentUser: state.auth.currentUser
    }
},)(CommentCard)

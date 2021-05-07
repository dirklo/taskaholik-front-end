import React from 'react'
import './CommentCard.css'
import { connect } from 'react-redux'
import { removeTaskComment } from '../actions/task'
import { removeDetailComment } from '../actions/detail'
import { parseTimestamp } from '../helpers/helpers'
import Delete from '@material-ui/icons/Delete'
import ChatBubble from '@material-ui/icons/ChatBubble'

function CommentCard({ comment, currentUser, commentType, removeTaskComment, removeDetailComment }) {

    return (
        <div className="comment-card">
            <div key={comment.id} className='comment-body'>
                    {currentUser.id === comment.author_id ?
                        <div 
                            className='delete-btn'
                            data-id={comment.id}
                            onClick={(e) => {
                                switch (commentType) {
                                    case 'task':
                                        removeTaskComment(
                                            e.target.dataset.id, 
                                            currentUser.id
                                        )
                                    break
                                    case 'detail':
                                        removeDetailComment(
                                            e.target.dataset.id, 
                                            currentUser.id
                                        )
                                    break
                                    default:
                                }
                            }}
                        >
                            <Delete className='delete-icon'/>
                        </div>
                    :
                        null
                    }
                <span className='comment-content'>{comment.content}</span>
                <span className='timestamp'>{parseTimestamp(comment.created_at)}</span>
            </div>
            <div className="author-div">
                <ChatBubble/>
                <span>{comment.author}</span>
            </div>
        </div>
    )

}

export default connect((state) => {
    return {
        currentUser: state.auth.currentUser
    }
}, { removeTaskComment, removeDetailComment })(CommentCard)

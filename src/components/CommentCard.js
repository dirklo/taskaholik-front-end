import React from 'react'
import { connect } from 'react-redux'
import { removeTaskComment } from '../actions/task'
import { removeDetailComment } from '../actions/detail'

function CommentCard(props) {

    return (
        <fieldset key={props.comment.id}>
        <h3>{props.comment.author} said:</h3>
        <span>{props.comment.content}</span>
        <p>at: {props.comment.created_at}</p>
        {props.currentUser.id === props.comment.author_id ?
            <button 
                type='button'
                data-id={props.comment.id}
                onClick={(e) => {
                    switch (props.commentType) {
                        case 'task':
                            props.removeTaskComment(
                                e.target.dataset.id, 
                                props.currentUser.id
                            )
                            break
                        case 'detail':
                            props.removeDetailComment(
                                e.target.dataset.id, 
                                props.currentUser.id
                            )
                            break
                        default:
                    }
                }}
            >
                Delete Comment
            </button>
            :
            null
        }
        </fieldset>
    )
}

export default connect((state) => {
    return {
        currentUser: state.auth.currentUser
    }
}, { removeTaskComment, removeDetailComment })(CommentCard)

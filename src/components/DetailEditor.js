import React from 'react'
import { connect } from 'react-redux'
import './DetailEditor.css'
import { completeDetail, deleteDetail } from '../actions/detail'
import CommentCard from '../components/CommentCard'
import NewCommentForm from './NewCommentForm'

function DetailEditor(props) {
    let currentDetail = props.details.find(detail => detail.selected === true)

    if (currentDetail) {
        return (
            <section className='detail-editor'>
                <span>This detail is {currentDetail.completed ? 'Completed' : 'Incomplete'}</span>
                {currentDetail.completed ? 
                    <button 
                        type='button'
                        data-complete="incomplete"
                        onClick={(e) => {
                            props.completeDetail(
                                currentDetail, 
                                e.target.dataset.complete
                            )
                        }}
                    >
                        Mark Item Incomplete
                    </button>
                    :
                    <button 
                        type='button' 
                        data-complete="complete"
                        onClick={(e) => {
                            props.completeDetail(
                                currentDetail, 
                                e.target.dataset.complete
                            )
                        }}
                    >
                        Mark Item Complete
                    </button>
                }
                {props.comments.map(comment =>
                    <CommentCard key={comment.id} comment={comment} commentType='detail' />
                )}
                <button 
                    onClick={() => {
                        props.deleteDetail(currentDetail.id)
                    }} 
                    type='button'
                >
                    Delete This Detail
                </button>
                <NewCommentForm commentType='detail'/>
            </section>
        )
    
    } else {
        return (
            <section className="detail-editor">
                Select a detail to edit
            </section>
        )
    }

}

export default connect((state) => {
    return {
        details: state.detail.details,
        comments: state.detail.detailComments,
        currentUser: state.auth.currentUser
    }
}, { completeDetail, deleteDetail })(DetailEditor)



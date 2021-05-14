import React from 'react'
import { connect } from 'react-redux'
import './DetailEditor.css'
import { completeDetail, deleteDetail } from '../../actions/detail'
import { currentTeam, currentDetail } from '../../helpers/helpers'
import CommentCard from '../cards/CommentCard'
import NewCommentForm from '../forms/NewCommentForm'
import UpdateDeadlineForm from '../forms/UpdateDeadlineForm'
import AssignmentsEditor from './AssignmentsEditor'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import CheckCircle from '@material-ui/icons/CheckCircle'
import DeleteOutline from '@material-ui/icons/DeleteOutline'


function DetailEditor({ currentUser, completeDetail, deleteDetail, comments }) {

    if (currentDetail()) {
        return (
            <section className='detail-editor'>
                <div className="detail-top">
                    <button 
                        type='button'
                        className={currentDetail().completed ? "complete-btn complete" : "complete-btn"}
                        onClick={(e) => {
                            completeDetail(currentDetail())
                        }}
                    >
                        {currentDetail().completed ? 'Mark Incomplete' : 'Mark Complete'}
                        {currentDetail().completed ? <CheckCircle /> : <CheckCircleOutline />}
                    </button>
                    {currentUser.id === currentTeam().leader_id ||
                        currentUser.id === currentDetail.creator_id ?
                            <button 
                                type='button'
                                className='delete-btn'
                                onClick={() => {
                                    deleteDetail(currentDetail().id)
                                }} 
                            >
                                <DeleteOutline />
                            </button>
                        :null
                    }
                </div>
                <h2>{currentDetail().content}</h2>
                
                <UpdateDeadlineForm />
                <AssignmentsEditor />
                <br/>
                <br/>
                <NewCommentForm commentType='detail'/>
                <div className="comments-container">
                    {comments.map(comment =>
                        <CommentCard 
                            key={comment.id} 
                            comment={comment} 
                            commentType='detail' 
                        />
                    )}
                </div>
            </section>
        )
    
    } else {
        return (
            <section className="detail-editor empty">
            </section>
        )
    }

}

export default connect((state) => {
    return {
        comments: state.detail.detailComments,
        currentUser: state.auth.currentUser,
        assignees: state.detail.detailAssignees,
        details: state.detail.details
    }
}, { completeDetail, deleteDetail })(DetailEditor)



import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './DetailEditor.css'
import { useQuery, useMutation } from 'react-query'
import { fetchDetailComments, createDetailComment, deleteDetailComment } from '../../queries/detailComments'
import { currentTeam, currentDetail } from '../../helpers/helpers'
import CommentCard from '../cards/CommentCard'
import NewCommentForm from '../forms/NewCommentForm'
import UpdateDeadlineForm from '../forms/UpdateDeadlineForm'
import AssignmentsEditor from './AssignmentsEditor'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import CheckCircle from '@material-ui/icons/CheckCircle'
import DeleteOutline from '@material-ui/icons/DeleteOutline'


function DetailEditor({ currentUser, completeDetail, deleteDetail, details }) {
    
    const { isLoading, error, data: comments, refetch, remove } = useQuery("detailComments", fetchDetailComments)

    const { mutate: mutateAddComment } = useMutation(createDetailComment, {
        onSuccess: () => {
            refetch()
        }
    })

    const { mutate: mutateDeleteComment } = useMutation(deleteDetailComment, {
        onSuccess: () => {
            refetch()
        }
    })

    useEffect(() => {
        remove()
        refetch()
    }, [details, refetch, remove])

    if (error) return "An Error Occured: " + error.message

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
                <NewCommentForm 
                    commentType='detail'
                    addComment={(comment) => mutateAddComment(comment)}
                />
                <div className="comments-container">
                    {
                    comments && !isLoading ? 
                        comments.map(comment =>
                            <CommentCard 
                                key={comment.id} 
                                comment={comment} 
                                commentType='detail'
                                deleteComment={(comment) => mutateDeleteComment(comment)} 
                            />
                            )
                        : "LOADING..."
                    }
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
})(DetailEditor)



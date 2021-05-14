import React, {useState} from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import './DetailEditor.css'
import { completeDetail, deleteDetail, addAssignee, removeAssignee } from '../../actions/detail'
import { currentTeam, parseTimestamp, currentDetail } from '../../helpers/helpers'
import CommentCard from '../cards/CommentCard'
import NewCommentForm from '../forms/NewCommentForm'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import CheckCircle from '@material-ui/icons/CheckCircle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

function DetailEditor({ completeDetail, deleteDetail, addAssignee, removeAssignee, comments, assignees }) {

    const [showAddAssignee, setShowAddAssignee] = useState(false)
    const [selectedAssignee, setSelectedAssignee] = useState(null)

    const memberOptions = currentTeam().members.map(member => {
            return {value: member.id, label: member.username}
    }).filter(member => !assignees.map(assignee => assignee.id).includes(member.value))

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
                    <button 
                        type='button'
                        className='delete-btn'
                        onClick={() => {
                            deleteDetail(currentDetail().id)
                        }} 
                    >
                        <DeleteOutline />
                    </button>
                </div>
                <h2>{currentDetail().content}</h2>
                <span className='deadline'>Deadline: {parseTimestamp(currentDetail().deadline)}</span>
                <div className="assignments">
                    <h3>Assigned team members:</h3>
                    {assignees.map(assignee => 
                        <div key={assignee.id} className="assignment-card">
                            <span className='name'>{assignee.username}</span>
                            <div 
                                className='remove-assignee-btn'
                                data-id={assignee.id}
                                onClick={(e) => {
                                    removeAssignee(e.target.dataset.id, currentTeam().id)
                                }}
                            >
                                    <RemoveCircle />
                            </div>
                        </div>
                    )}
                    <br/>
                    {!showAddAssignee ?
                        <button 
                            type='button'
                            onClick={() => setShowAddAssignee(true)}
                        >
                            Assign Team Member
                        </button>
                        :
                        <div className='add-assignee'>
                            <form
                                className='add-assignee-form'
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    addAssignee(selectedAssignee.value, currentDetail().id)
                                    setShowAddAssignee(false)
                                }}
                            >
                                <Select
                                    options={memberOptions}
                                    onChange={setSelectedAssignee}
                                >
                                </Select>
                                <br/>
                                <div className="buttons">
                                    <input type="submit" value="Assign"/>
                                    <button 
                                        type='button'
                                        onClick={() => setShowAddAssignee(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
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
}, { completeDetail, deleteDetail, addAssignee, removeAssignee })(DetailEditor)



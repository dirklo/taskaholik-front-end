import React, {useState} from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import './DetailEditor.css'
import { completeDetail, deleteDetail, addAssignee, removeAssignee } from '../actions/detail'
import CommentCard from '../components/CommentCard'
import NewCommentForm from './NewCommentForm'
import { currentTeam, parseTimestamp } from '../helpers/helpers'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import CheckCircle from '@material-ui/icons/CheckCircle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

function DetailEditor({ completeDetail, deleteDetail, addAssignee, removeAssignee, comments, assignees, details }) {

    const [showAddAssignee, setShowAddAssignee] = useState(false)
    const [selectedAssignee, setSelectedAssignee] = useState(null)

    const memberOptions = currentTeam().members.map(member => {
            return {value: member.id, label: member.username}
    }).filter(member => !assignees.map(assignee => assignee.id).includes(member.value))

    let currentDetail = details.find(detail => detail.selected === true)

    if (currentDetail) {
        return (
            <section className='detail-editor'>
                <h2>{currentDetail.content}</h2>
                <button 
                    type='button'
                    className={currentDetail.completed ? "complete-btn complete" : "complete-btn"}
                    onClick={(e) => {
                        completeDetail(currentDetail)
                    }}
                >
                    {currentDetail.completed ? <CheckCircle /> : <CheckCircleOutline/>}
                </button>
                <span className='deadline'>Deadline: {parseTimestamp(currentDetail.deadline)}</span>
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
                            <button 
                                type='button'
                                onClick={() => setShowAddAssignee(false)}
                            >
                                Cancel
                            </button>
                            <form
                                className='add-assignee-form'
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    addAssignee(selectedAssignee.value, currentDetail.id)
                                    setShowAddAssignee(false)
                                }}
                            >
                                <Select
                                    options={memberOptions}
                                    onChange={setSelectedAssignee}
                                >
                                </Select>
                                <br/>
                                <input type="submit" value="Assign"/>
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
                <button 
                    type='button'
                    className='delete-btn'
                    onClick={() => {
                        deleteDetail(currentDetail.id)
                    }} 
                >
                    Delete This Detail
                </button>
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
        comments: state.detail.detailComments,
        currentUser: state.auth.currentUser,
        assignees: state.detail.detailAssignees,
        details: state.detail.details
    }
}, { completeDetail, deleteDetail, addAssignee, removeAssignee })(DetailEditor)



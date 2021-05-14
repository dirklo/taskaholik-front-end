import React, { useState } from 'react'
import './AssignmentsEditor.css'
import { connect } from 'react-redux'
import Select from 'react-select'
import { currentTeam, currentDetail } from '../../helpers/helpers'
import { removeAssignee, addAssignee } from '../../actions/detail'
import RemoveCircle from '@material-ui/icons/RemoveCircle'


function AssignmentsEditor({ assignees, addAssignee, removeAssignee, currentUser }) {

    const [showAddAssignee, setShowAddAssignee] = useState(false)
    const [selectedAssignee, setSelectedAssignee] = useState(null)

    const memberOptions = currentTeam().members.map(member => {
            return {value: member.id, label: member.username}
    }).filter(member => !assignees.map(assignee => assignee.id).includes(member.value))

    return (
        <div className="assignments-editor">
            {assignees.length > 0 ?
                <>
                    <h3>Assigned team members:</h3>
                    {assignees.map(assignee => 
                        <div key={assignee.id} className="assignment-card">
                            <span className='name'>{assignee.username}</span>
                            {currentUser.id === currentTeam().leader_id ?
                                <div 
                                    className='remove-assignee-btn'
                                    data-id={assignee.id}
                                    onClick={(e) => {
                                        removeAssignee(e.target.dataset.id, currentDetail().id)
                                    }}
                                >
                                        <RemoveCircle />
                                </div>
                                : null
                            }
                        </div>
                    )}
                </>
                : null
            }
            <br/>
            {currentUser.id === currentTeam().leader_id ?
                <>
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
                </>
                : null
            }
        </div>
    )
}

export default connect((state) => {
    return {
        assignees: state.detail.detailAssignees,
        currentUser: state.auth.currentUser
    }
}, { removeAssignee, addAssignee })(AssignmentsEditor)



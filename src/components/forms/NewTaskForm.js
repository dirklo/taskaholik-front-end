import React, { useState } from 'react'
import './NewTaskForm.css'
import { connect } from 'react-redux'
import { addTask } from '../../actions/task'
import { currentProject } from '../../helpers/helpers'
import { updateUserSelections } from '../../actions/auth'

function NewTaskForm({ currentUser, addTask, updateUserSelections }) {

    const [title, setTitle] = useState('')
    const [showForm, setShowForm] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(title, currentProject(), currentUser)
        updateUserSelections(currentUser.id)
        setTitle('')
        setShowForm(false)
    }

    return (
        <div className='new-task'>
            { !showForm ? 
                <button 
                    type='button'
                    onClick={() => setShowForm(true)}
                >
                    + Add New Goal
                </button>
                :
                <>
                    <button 
                        type='button'
                        onClick={() => setShowForm(false)}
                    >
                        + Cancel
                    </button>
                    <form
                        className="new-task-form"
                        onSubmit={(e) => handleSubmit(e)}
                        >
                        <br/>
                        <input 
                            type="text"
                            id="add-new-task"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        <input type="submit" value="Add Goal"/>
                    </form>
                </>
            }
        </div>
    )
}

export default connect((state) => {
    return {
       currentUser: state.auth.currentUser,
       projects: state.project.projects
    }
}, { addTask, updateUserSelections } )(NewTaskForm)



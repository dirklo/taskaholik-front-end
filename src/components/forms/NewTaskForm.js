import React, { useState } from 'react'
import './NewTaskForm.css'
import { connect } from 'react-redux'
import { addTask } from '../../actions/task'
import { currentProject } from '../../helpers/helpers'

function NewTaskForm({ currentUser, addTask }) {

    const [title, setTitle] = useState('')
    const [showForm, setShowForm] = useState(false)

    return (
        <div className='new-task'>
            { !showForm ? 
                <button 
                    type='button'
                    onClick={(e) => setShowForm(true)}
                >
                    + Add New Goal
                </button>
                :
                <>
                    <button 
                        type='button'
                        onClick={(e) => setShowForm(false)}
                    >
                        + Cancel
                    </button>
                    <form
                        className="new-task-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            addTask(title, currentProject(), currentUser)
                            setTitle('')
                            setShowForm(false)
                        }}
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
}, { addTask } )(NewTaskForm)



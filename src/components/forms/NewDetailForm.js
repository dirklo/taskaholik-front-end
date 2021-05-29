import React, { useState } from 'react'
import './NewDetailForm.css'
import "react-datepicker/dist/react-datepicker.css"
import { connect } from 'react-redux'
import { addDetail } from '../../actions/detail'
import { currentTask } from '../../helpers/helpers'
import { updateUserSelections } from '../../actions/auth'
import ErrorField from '../ErrorField'
import Close from '@material-ui/icons/Close'
import DatePicker from 'react-datepicker'

function NewDetailForm({ currentUser, addDetail, updateUserSelections }) {

    const [content, setContent] = useState('')
    const [deadline, setDeadline] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!error) {
            setShowForm(false)
            setContent('')
        }
        addDetail(content, currentTask(), currentUser, deadline)
        .catch((error) => {setError(error)})
        updateUserSelections(currentUser.id)
    }
    return (
        <div className="new-detail-form">
            { error ?
                <ErrorField 
                    error={error}
                    timeout='5000'
                    clearError={() => setError('')}
                />
                : null
            }
            { showForm ? 
                <> 
                    <button 
                        type='button'
                        className="cancel-btn"
                        onClick={(e) => {
                            setShowForm(false)
                            setContent('')
                            setDeadline('')
                        }}
                    >
                        <Close />
                    </button>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <label htmlFor="add-detail">
                            Description:
                        </label>
                        <br/>
                        <input 
                            type="text"
                            id="add-detail"
                            value={content}
                            placeholder='Description'
                            onChange={(e) => setContent(e.target.value)}
                            />
                        <br/>
                        <label htmlFor="deadline"> Deadline:</label>
                        <br/>
                        <DatePicker 
                            selected={deadline}
                            onChange={date => setDeadline(date)}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                        <br/>
                        <br/>
                        <input type="submit" value="Add Detail"/>
                    </form>
                </>
            :
                <button 
                    className='show-form-btn'
                    onClick={(e) => setShowForm(true)}
                >
                    + Add New Detail
                </button>
            }
        </div>
    )
}

export default connect((state) => {
    return {
       currentUser: state.auth.currentUser
    }
}, { addDetail, updateUserSelections } )(NewDetailForm)



import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './NewCommentForm.css'
import ErrorField from '../ErrorField'

function NewCommentForm({ commentType, addComment, tasks }) {
    const [content, setContent] = useState('')
    const [error, setError] = useState('')

    useEffect(() => setError(''), [tasks])

    return (
        <div className='new-comment-form'>
            <form 
                onSubmit={(e) => {
                    e.preventDefault()
                    addComment(content)
                    setContent('')
                }}
            >
                <input 
                    type='text'
                    name='content' 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                >
                </input>
                <input
                    className={commentType=== "task" ? 'comment-submit task' : 'comment-submit detail' }
                    type='submit' 
                    value="Post Comment"/>
                <br/>
            </form>
            { error ?
                <ErrorField 
                    error={error}
                    timeout='5000'
                    clearError={() => setError('')}
                /> : null
            }
        </div>
    )
}

export default connect((state) => {
    return {
        currentUser: state.auth.currentUser,
        tasks: state.task.tasks,
        details: state.detail.details
    }
})(NewCommentForm)



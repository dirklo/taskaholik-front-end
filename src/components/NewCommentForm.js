import React, { useState } from 'react'
import { connect } from 'react-redux'
import './NewCommentForm.css'
import { addTaskComment } from '../actions/task'

function NewCommentForm(props) {
    const [content, setContent] = useState('')

    let currentTask = props.tasks.find(task => task.selected === true)

    return (
        <div>
            <form 
                onSubmit={(e) => {
                    e.preventDefault()
                    props.addTaskComment(
                        currentTask.id, 
                        content,  
                        props.currentUser.id, 
                        props.currentUser.username 
                    )
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
                <input type='submit' value="Post Comment"/>
                <br/>
                <span>Posting as {props.currentUser.username}</span>
            </form>
        </div>
    )
}

export default connect((state) => {
    return {
        currentUser: state.auth.currentUser,
        tasks: state.task.tasks
    }
}, { addTaskComment })(NewCommentForm)



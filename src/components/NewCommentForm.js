import React, { useState } from 'react'
import { connect } from 'react-redux'
import './NewCommentForm.css'
import { addTaskComment } from '../actions/task'
import { addDetailComment } from '../actions/detail'

function NewCommentForm(props) {
    const [content, setContent] = useState('')

    let currentTask = props.tasks.find(task => task.selected === true)
    let currentDetail = props.details.find(detail => detail.selected === true)

    return (
        <div>
            <form 
                onSubmit={(e) => {
                    e.preventDefault()
                    switch (props.commentType) {
                        case 'task':
                            props.addTaskComment(
                                currentTask.id, 
                                content,  
                                props.currentUser.id, 
                                props.currentUser.username
                            )
                            break
                        case 'detail':
                            props.addDetailComment(
                                currentDetail.id, 
                                content,  
                                props.currentUser.id, 
                                props.currentUser.username
                            )
                            break
                        default:
                    }
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
        tasks: state.task.tasks,
        details: state.detail.details
    }
}, { addTaskComment, addDetailComment })(NewCommentForm)



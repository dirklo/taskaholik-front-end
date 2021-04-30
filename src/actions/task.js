export const setCurrentTask = (taskId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tasks/${taskId}`)
        .then(res => res.json())
        .then(json => {
            dispatch({type: "POPULATE_TASK_COMMENTS", payload: json.comments})
            dispatch({type: "SET_CURRENT_TASK", payload: json.task.id})
        })
    }
}

export const populateDetails = (taskId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/details?taskId=${taskId}`)
        .then(res => res.json())
        .then(details => {
            dispatch({type: "POPULATE_DETAILS", payload: details})
        })
    }
}

export const addTaskComment = (taskId, content, authorId, author) => {
    return (dispatch) => {
        fetch('http://localhost:3001/task_comments', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task_comment: {
                    task_id: taskId,
                    content: content, 
                    author_id: authorId
                }
            })
        })
        .then(res => res.json())
        .then(
            json => {
                dispatch({type: "ADD_TASK_COMMENT", 
                    payload: {
                        ...json.comment,
                        author: json.author,
                    }
                })
            }
        )
    }
}

export const removeTaskComment = (commentId, currentUserId) => {
    return (dispatch) => {
        dispatch({type: "REMOVE_TASK_COMMENT", payload: commentId})
        fetch(`http://localhost:3001/task_comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {task_comment: 
                    {task_id: commentId, userId: currentUserId}
                }
            )
        })
        .then((res) => console.log(res))
    }
} 

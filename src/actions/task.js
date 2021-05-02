export const populateTasks = (projectId) => {
    return async (dispatch) => {
        return await fetch(`http://127.0.0.1:3001/tasks?projectId=${projectId}`)
        .then((res) => res.json())
        .then((tasks) => {
            tasks.map(task => task['selected'] = false)
            dispatch({ type: "POPULATE_TASKS", payload: tasks})
        });
    }
};         

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

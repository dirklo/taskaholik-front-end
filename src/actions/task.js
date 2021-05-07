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

export const addTask = (title, currentProject, creator) => {
    return (dispatch) => {
        fetch('http://localhost:3001/tasks', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title, 
                project_id: currentProject.id, 
                creator_id: creator.id
            })
        })
        .then(res => res.json())
        .then(json => {
            dispatch({type: 'ADD_TASK', payload: json})
        })
    }
}

export const deleteTask = (taskId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.status === 401) {
                throw Error
            }
            console.log(json)
            dispatch({type: 'DELETE_TASK', payload: taskId})
        })
        .catch(err => console.log(err))
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
                        author: author,
                    }
                })
            }
        )
    }
}

export const removeTaskComment = (commentId, currentUserId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/task_comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {task_comment: 
                    {user_id: currentUserId}
                }
                )
            })
            .then((res) => {
                if (res.status === 200) {
                    dispatch({type: "REMOVE_TASK_COMMENT", payload: commentId})
                } else {
                    alert('An error occurred, comment not deleted!')
                }
            })
    }
} 

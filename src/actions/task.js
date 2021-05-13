import { baseUrl, handleResponse } from '../helpers/helpers'
import { getToken } from './auth'

export const populateTasks = (projectId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/tasks?projectId=${projectId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            }
        })
        .then((res) => {
            return handleResponse(res, (tasks) => {
                tasks.map(task => task['selected'] = false)
                dispatch({ type: "POPULATE_TASKS", payload: tasks})
            })
        })
    }
};         

export const setCurrentTask = (taskId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/tasks/${taskId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            }
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({type: "CLEAR_DETAIL_COMMENTS"})
                dispatch({type: "SET_CURRENT_TASK", payload: json.task.id})
                dispatch({type: "POPULATE_TASK_COMMENTS", payload: json.comments})
            })
        })
    }
}

export const addTask = (title, currentProject, creator) => {
    return (dispatch) => {
        fetch(`${baseUrl}/tasks`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            },
            body: JSON.stringify({
                title: title, 
                project_id: currentProject.id, 
                creator_id: creator.id
            })
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({type: 'CLEAR_DETAILS'})
                dispatch({type: 'CLEAR_DETAIL_COMMENTS'})
                dispatch({type: 'CLEAR_TASK_COMMENTS'})
                dispatch({type: 'ADD_TASK', payload: json})
            })
        })
    }
}

export const deleteTask = (taskId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: getToken()
            }
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({type: 'DELETE_TASK', payload: taskId})
            })
        })
    }
}

export const addTaskComment = (taskId, content, authorId, author) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/task_comments`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            },
            body: JSON.stringify({
                task_comment: {
                    task_id: taskId,
                    content: content, 
                    author_id: authorId
                }
            })
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({type: "ADD_TASK_COMMENT", 
                    payload: {
                        ...json.comment,
                        author: author,
                    }
                })
            })
        })
    }
}

export const removeTaskComment = (commentId, currentUserId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/task_comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            },
            body: JSON.stringify(
                {task_comment: 
                    {user_id: currentUserId}
                }
            )
        })
        .then((res) => {
            return handleResponse(res, (json) => {
                dispatch({type: "REMOVE_TASK_COMMENT", payload: commentId})
            })
        })
    }
} 

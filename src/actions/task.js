import { baseUrl, handleResponse } from '../helpers/helpers'
import { getToken } from './auth'       

export const setCurrentTask = (taskId) => {
    return (dispatch) => {
        dispatch({type: "SET_CURRENT_TASK", payload: taskId})
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
                dispatch({ type: "ADD_TASK", payload: json.task})
                dispatch({ type: "SET_CURRENT_TASK", payload: json.task.id })
                dispatch({
                    type: "SET_USER_SELECTED", 
                    payload: {
                        'selected_task': json.task.id,
                        'selected_detail': null
                    }
                })
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
                dispatch({type: 'TASK_CLEANUP', payload: taskId})
            })
        })
    }
}


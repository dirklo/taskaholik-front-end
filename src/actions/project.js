import { baseUrl, handleResponse } from '../helpers/helpers'
import { getToken } from '../actions/auth'

export const setCurrentProject = (projectId) => {
    return (dispatch) => {
        dispatch({ type: "SET_CURRENT_PROJECT", payload: projectId })
    }
}

export const addProject = (projectName, currentTeam, currentUser, deadline) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/projects`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getToken()
            },
            body: JSON.stringify({project: {
                title: projectName, 
                team_id: currentTeam.id, 
                creator_id: currentUser.id,
                deadline: deadline
            }}) 
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({ type: "ADD_PROJECT", payload: json.project})
                dispatch({ type: "SET_CURRENT_PROJECT", payload: json.project.id })
                dispatch({ type: "SET_CURRENT_TASK", payload: null})
                dispatch({ type: "SET_CURRENT_DETAIL", payload: null})
                dispatch({
                    type: "SET_USER_SELECTED", 
                    payload: {
                        'selected_project': json.project.id,
                        'selected_task': null,
                        'selected_detail': null
                    }
                })
            })
        })
    }
}

export const deleteProject = (projectId, currentUser) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/projects/${projectId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getToken()
            },
            body: JSON.stringify({project: {user_id: currentUser.id}})
        })
        .then(res => {
            return handleResponse(res, () => {
                dispatch({ type: 'DELETE_PROJECT', payload: projectId })
            }) 
        })
    }
}
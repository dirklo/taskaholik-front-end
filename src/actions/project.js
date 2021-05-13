import { baseUrl, handleResponse } from '../helpers/helpers'
import { getToken } from '../actions/auth'

export const populateProjects = (teamId) => {
    return async (dispatch) => {
        return await fetch(`${baseUrl}/projects?teamId=${teamId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        })
        .then((res) => {
            return handleResponse(res, (projects) => {
                projects.map(project => project['selected'] = false)
                dispatch({ type: "POPULATE_PROJECTS", payload: projects})
            })
        })
    }
};

export const setCurrentProject = (projectId) => {
    return (dispatch) => {
        dispatch({ type: "SET_CURRENT_PROJECT", payload: projectId })
        dispatch({ type: "CLEAR_DETAILS" })
        dispatch({ type: "CLEAR_TASKS" })
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
                dispatch({ type: "CLEAR_DETAILS" })
                dispatch({ type: "CLEAR_TASKS" })
                dispatch({ type: "ADD_PROJECT", payload: json.project})
                dispatch({ type: "SET_CURRENT_PROJECT", payload: json.project.id })
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
                dispatch({ type: "CLEAR_DETAILS" })
                dispatch({ type: "CLEAR_TASKS" })
                dispatch({ type: 'DELETE_PROJECT', payload: projectId })
            }) 
        })
    }
}
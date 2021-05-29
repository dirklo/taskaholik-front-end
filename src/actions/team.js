import { baseUrl, handleResponse } from '../helpers/helpers'
import { getToken } from './auth'

export const populateTeams = (userId, preSelectId) => {
    return async (dispatch) => {
        return await fetch(`${baseUrl}/teams?userId=${userId}`)
        .then((res) => {
            return handleResponse(res, (teams) => {
                dispatch({ type: "POPULATE_TEAMS", payload: teams })
                dispatch({ type: "SET_CURRENT_TEAM", payload: preSelectId })
            })
        })
    }
}

export const loadTeamData = (teamId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/teams/${teamId}`)
        .then((res) => {
            return handleResponse(res, (teamData) => {
                dispatch({ type: "POPULATE_PROJECTS", payload: teamData.projects})
                dispatch({ type: "POPULATE_TASKS", payload: teamData.tasks})
                dispatch({ type: "POPULATE_DETAILS", payload: teamData.details})
            })
        })
    }
}

export const setCurrentTeam = (teamId) => {
    return (dispatch) => {
        dispatch({type: "SET_CURRENT_TEAM", payload: Number(teamId)})
    }
}

export const addTeam = (teamName, currentUser) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/teams`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getToken()
            },
            body: JSON.stringify({
                team: {
                    name: teamName, 
                    user_id: currentUser.id
                }
            })
        })
        .then(res => {
            return handleResponse(res, (json) => {
                let team = json.team
                team.members = []
                team.leader = currentUser.username
                dispatch({type: 'ADD_TEAM', payload: json.team})
                return json
            })
        })
    }
}

export const addMember = (query, teamId) => {
    return (dispatch) => {
        fetch(`${baseUrl}/memberships`, {
            method: 'POST',
            headers: {
                'Accept': 'applicaiton/json',
                'Content-type': 'application/json',
                'Authorization': getToken()
            },
            body: JSON.stringify({membership: {query: query, team_id: teamId}})
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({
                    type: "ADD_MEMBER", 
                    payload: {member: json.member, teamId: teamId}
                })
            })
        })
    }
}

export const removeMember = (memberId, teamId) => {
    return (dispatch) => {
        fetch(`${baseUrl}/memberships`, {
            method: 'DELETE',
            headers: {
                'Accept': 'applicaiton/json',
                'Content-type': 'application/json',
                'Authorization': getToken()
            },
            body: JSON.stringify({membership: {user_id: memberId, team_id: teamId}})
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({
                    type: "REMOVE_MEMBER", 
                    payload: {memberId: memberId, teamId: teamId}
                })
            })
        })
    }
}

export const updateTeam = (teamId, param) => {
    return (dispatch) => {
        fetch(`${baseUrl}/teams/${teamId}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'applicaiton/json',
                'Content-type': 'application/json',
                'Authorization': getToken()
            },
            body: JSON.stringify({team: param})
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({type: "UPDATE_TEAM", payload: json.team})
            })
        })
    }
}

export const clearTeam = () => {
    return (dispatch) => {
        dispatch({type: "CLEAR_DETAILS"})
        dispatch({type: "CLEAR_TASKS"})
        dispatch({type: "CLEAR_PROJECTS"})
    }
}

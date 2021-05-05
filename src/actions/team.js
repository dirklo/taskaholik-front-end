export const populateTeams = (userId, preSelectId) => {
    return async (dispatch) => {
        return await fetch(`http://127.0.0.1:3001/teams?userId=${userId}`)
        .then((res) => res.json())
        .then((teams) => {
            dispatch({ type: "POPULATE_TEAMS", payload: teams })
            dispatch({ type: "SET_CURRENT_TEAM", payload: preSelectId })
        });
    }
};

export const setCurrentTeam = (teamId) => {
    return { type: "SET_CURRENT_TEAM", payload: Number(teamId) }
}

export const addTeam = (teamName, currentUserId) => {
    return (dispatch) => {
        return fetch(`http://localhost:3001/teams`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                team: {
                    name: teamName, 
                    user_id: currentUserId
                }
            })
        })
        .then(res => res.json())
        .then(json => {
            dispatch({type: 'ADD_TEAM', payload: json.team})
            return json
        })
    }
}

export const addMember = (query, teamId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/memberships`, {
            method: 'POST',
            headers: {
                'Accept': 'applicaiton/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({membership: {query: query, team_id: teamId}})
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            dispatch({type: "ADD_MEMBER", payload: {member: json.member, teamId: teamId}})
        })
        .catch(err => console.log(err))
    }
}

export const removeMember = (memberId, teamId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/memberships`, {
            method: 'DELETE',
            headers: {
                'Accept': 'applicaiton/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({membership: {user_id: memberId, team_id: teamId}})
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            dispatch({type: "REMOVE_MEMBER", payload: {memberId: memberId, teamId: teamId}})
        })
        .catch(err => console.log(err))
    }
}
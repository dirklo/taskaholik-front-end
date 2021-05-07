export const populateProjects = (teamId, preSelectId) => {
    return async (dispatch) => {
        return await fetch(`http://127.0.0.1:3001/projects?teamId=${teamId}`)
        .then((res) => res.json())
        .then((projects) => {
            projects.map(project => project['selected'] = false)
            dispatch({ type: "POPULATE_PROJECTS", payload: projects})
            if (projects.length > 0) {
                dispatch({ type: "SET_CURRENT_PROJECT", payload: preSelectId })
            }
        });
    }
};

export const setCurrentProject = (projectId) => {
    return (dispatch) => {
        dispatch({ type: "CLEAR_DETAILS" })
        dispatch({ type: "CLEAR_TASKS" })
        dispatch({ type: "SET_CURRENT_PROJECT", payload: projectId })
    }
}

export const addProject = (projectName, currentTeam, currentUser) => {
    return (dispatch) => {
        fetch('http://localhost:3001/projects', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: projectName, team_id: currentTeam.id, creator_id: currentUser.id}) 
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            dispatch({ type: "CLEAR_DETAILS" })
            dispatch({ type: "CLEAR_TASKS" })
            dispatch({ type: "ADD_PROJECT", payload: json.project})
            dispatch({ type: "SET_CURRENT_PROJECT", payload: json.project.id })
        })
    }
}
export const populateTeams = (userId) => {
    return async (dispatch) => {
        return await fetch(`http://127.0.0.1:3001/teams?userId=${userId}`)
        .then((res) => res.json())
        .then((teams) => {
            dispatch({ type: "POPULATE_TEAMS", payload: teams})
        });
    }
};

export const populateProjects = (teamId) => {
    return async (dispatch) => {
        return await fetch(`http://127.0.0.1:3001/projects?teamId=${teamId}`)
        .then((res) => res.json())
        .then((projects) => {
            dispatch({ type: "POPULATE_PROJECTS", payload: projects})
        });
    }
};

export const populateTasks = (projectId) => {
    return async (dispatch) => {
        return await fetch(`http://127.0.0.1:3001/tasks?projectId=${projectId}`)
        .then((res) => res.json())
        .then((tasks) => {
            dispatch({ type: "POPULATE_TASKS", payload: tasks})
        });
    }
};         
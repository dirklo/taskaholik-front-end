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
        dispatch({ type: "SET_CURRENT_PROJECT", payload: projectId })
    }
}
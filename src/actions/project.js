export const populateProjects = (teamId) => {
    return async (dispatch) => {
        return await fetch(`http://127.0.0.1:3001/projects?teamId=${teamId}`)
        .then((res) => res.json())
        .then((projects) => {
            projects.map(project => project['selected'] = true)
            dispatch({ type: "POPULATE_PROJECTS", payload: projects})
        });
    }
};
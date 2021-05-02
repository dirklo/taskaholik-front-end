export const populateTeams = (userId) => {
    return async (dispatch) => {
        return await fetch(`http://127.0.0.1:3001/teams?userId=${userId}`)
        .then((res) => res.json())
        .then((teams) => {
            dispatch({ type: "POPULATE_TEAMS", payload: teams})
        });
    }
};
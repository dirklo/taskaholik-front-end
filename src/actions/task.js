export const setCurrentTask = (taskId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tasks/${taskId}`)
        .then(res => res.json())
        .then(json => {
            dispatch({type: "POPULATE_TASK_COMMENTS", payload: json.comments})
            dispatch({type: "SET_CURRENT_TASK", payload: json.task.id})
        })
    }
}

export const populateDetails = (taskId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/details?taskId=${taskId}`)
        .then(res => res.json())
        .then(details => {
            dispatch({type: "POPULATE_DETAILS", payload: details})
        })
    }
}

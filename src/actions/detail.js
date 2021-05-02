export const populateDetails = (taskId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/details?taskId=${taskId}`)
        .then(res => res.json())
        .then(details => {
            details.map(detail => detail['selected'] = false)
            dispatch({type: "POPULATE_DETAILS", payload: details})
        })
    }
}

export const setCurrentDetail = (detailId) => {
    return (dispatch) => {
        return fetch(`http://localhost:3001/details/${detailId}`)
        .then((res) => res.json())
        .then((json) => {
            dispatch({type: "POPULATE_DETAIL_COMMENTS", payload: json.comments})
            dispatch({type: "SET_CURRENT_DETAIL", payload: json.detail})
        });
    }
};

export const completeDetail = (detail) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/details/${detail.id}/complete`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({complete: true})
        })
        .then(res => res.json())
        .then((json) => {
            dispatch({type:'COMPLETE_DETAIL', payload: detail.id})
        })
    }
} 
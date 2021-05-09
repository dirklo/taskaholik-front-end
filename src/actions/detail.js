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
            body: JSON.stringify({status: detail.completed})
        })
        .then(res => res.json())
        .then((json) => {
            dispatch({type: 'COMPLETE_DETAIL', payload: {detail: detail, status: detail.completed}})
        })
    }
}

export const addDetail = (content, currentTask, currentUser, deadline) => {
    return (dispatch) => {
        fetch('http://localhost:3001/details', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: content, 
                task_id: currentTask.id, 
                creator_id: currentUser.id,
                deadline: deadline
            })
        })
        .then(res => res.json())
        .then(json => {
            dispatch({type: 'ADD_DETAIL', payload: json})
        })
    }
}

export const addDetailComment = (detailId, content, authorId, author) => {
    return (dispatch) => {
        fetch('http://localhost:3001/detail_comments', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                detail_comment: {
                    detail_id: detailId,
                    content: content, 
                    author_id: authorId
                }
            })
        })
        .then(res => res.json())
        .then(
            json => {
                dispatch({type: "ADD_DETAIL_COMMENT", 
                    payload: {
                        ...json.comment,
                        author: author,
                    }
                })
            }
        )
    }
}

export const removeDetailComment = (commentId, currentUserId) => {
    return (dispatch) => {
        dispatch({type: "REMOVE_DETAIL_COMMENT", payload: commentId})
        fetch(`http://localhost:3001/detail_comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({detail_comment: {user_id: currentUserId}})
        })
        .then((res) => console.log(res))
    }
} 

export const deleteDetail = (detailId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/details/${detailId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(json => {
            dispatch({type: 'DELETE_DETAIL', payload: detailId})
        })
    }
}



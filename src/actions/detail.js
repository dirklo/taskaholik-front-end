import { baseUrl, handleResponse } from '../helpers/helpers' 
import { getToken } from './auth'

// export const populateDetails = (taskId) => {
//     return (dispatch) => {
//         return fetch(`${baseUrl}/details?taskId=${taskId}`, {
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 Authorization: getToken()
//             }
//         })
//         .then(res => {
//             return handleResponse(res, (details) => {
//                 details.map(detail => detail['selected'] = false)
//                 dispatch({type: "POPULATE_DETAILS", payload: details})
//             })
//         })
//     }
// }

export const setCurrentDetail = (detailId) => {
    return (dispatch) => {
        dispatch({type: "SET_CURRENT_DETAIL", payload: detailId})
    }
}

export const completeDetail = (detail) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/details/${detail.id}/complete`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: getToken()
            },
            body: JSON.stringify({status: detail.completed})
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({
                    type: 'COMPLETE_DETAIL', 
                    payload: {detail: detail, status: detail.completed}
                })
            })
        })
    }
}

export const addDetail = (content, currentTask, currentUser, deadline) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/details`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            },
            body: JSON.stringify({
                content: content, 
                task_id: currentTask.id, 
                creator_id: currentUser.id,
                deadline: deadline
            })
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({ type: "ADD_DETAIL", payload: json.detail})
                dispatch({ type: "SET_CURRENT_DETAIL", payload: json.detail.id })
                dispatch({
                    type: "SET_USER_SELECTED", 
                    payload: {
                        'selected_detail': json.detail.id
                    }
                })
            })
        })
    }
}

export const populateDetailComments = (detailId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/detail_comments?detail_id=${detailId}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            }
        })
        .then(res => {
            return handleResponse(res, (comments) => {
                dispatch({type: "POPULATE_DETAIL_COMMENTS", payload: comments})
            })
        })
    }
}

export const populateDetailAssignees = (detailId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/assignments?detail_id=${detailId}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            }
        })
        .then(res => {
            return handleResponse(res, (assignees) => {
                dispatch({type: "POPULATE_DETAIL_COMMENTS", payload: assignees})
            })
        })
    }
}

export const addDetailComment = (detailId, content, authorId, author) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/detail_comments`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            },
            body: JSON.stringify({
                detail_comment: {
                    detail_id: detailId,
                    content: content, 
                    author_id: authorId
                }
            })
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch(
                    {type: "ADD_DETAIL_COMMENT", 
                        payload: {
                            ...json.comment,
                            author: author,
                        }
                    }
                )
            })
        })
    }
}

export const removeDetailComment = (commentId, currentUserId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/detail_comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            },
            body: JSON.stringify({detail_comment: {user_id: currentUserId}})
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({type: "REMOVE_DETAIL_COMMENT", payload: commentId})
            })
        })
    }
} 

export const deleteDetail = (detailId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/details/${detailId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            }
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({type: 'DELETE_DETAIL', payload: detailId})
                dispatch({type: 'SET_USER_SELECTED', payload: {selected_detail: null}})
            })
        })
    }
}

export const addAssignee = (userId, detailId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/assignments`, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                Authorization: getToken()
            },
            body: JSON.stringify({assignment: {user_id: userId, detail_id: detailId}})
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({type: 'ADD_ASSIGNEE', payload: json.member})
            })
        })
    }
}

export const removeAssignee = (userId, detailId) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/assignments`, {
            method: 'DELETE',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                Authorization: getToken()
            },
            body: JSON.stringify({assignment: { user_id: userId, detail_id: detailId}})
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({type: 'REMOVE_ASSIGNEE', payload: userId})
            })
        })
    }
}

export const updateDetail = (detailId, param) => {
    return (dispatch) => {
        return fetch(`${baseUrl}/details/${detailId}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: getToken()
            },
            body: JSON.stringify({detail: param})
        })
        .then(res => {
            return handleResponse(res, (json) => {
                dispatch({type: 'UPDATE_DETAIL', payload: json.detail})
                dispatch({type: 'SET_CURRENT_DETAIL', payload: json.detail})
            })
        })
    }
}


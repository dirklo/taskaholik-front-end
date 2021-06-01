import { baseUrl, currentDetail } from '../helpers/helpers'
import { getToken } from '../actions/auth'

export const fetchAssignees = () => {
    return fetch(`${baseUrl}/assignments?detail_id=${currentDetail().id}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: getToken()
        }
    })
    .then(res => res.json())
}

export const addAssignee = (userId) => {
    return fetch(`${baseUrl}/assignments`, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            Authorization: getToken()
        },
        body: JSON.stringify({assignment: {user_id: userId, detail_id: `${currentDetail().id}`}})
    })
    .then(res => res.json())
}

export const removeAssignee = (userId, detailId) => {
    return fetch(`${baseUrl}/assignments`, {
        method: 'DELETE',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            Authorization: getToken()
        },
        body: JSON.stringify({assignment: { user_id: userId, detail_id: detailId}})
    })
    .then(res => res.json())
}


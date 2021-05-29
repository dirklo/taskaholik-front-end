import { baseUrl, currentDetail, handleResponse } from '../helpers/helpers'
import { getToken } from '../actions/auth'


export async function fetchDetailComments() {
    const response = await fetch(`${baseUrl}/detail_comments?detail_id=${currentDetail().id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: getToken()
        }
    })
    const comments = await handleResponse(response, (json) => json)
    return comments
}

export async function createDetailComment(content) {
    const response = await fetch(`${baseUrl}/detail_comments`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: getToken()
        },
        body: JSON.stringify({ detail_comment: {
            detail_id: currentDetail().id,
            content: content
        }})
    })
    const comment = await handleResponse(response, (json) => json)
    return comment
}

export async function deleteDetailComment(commentId) {
    const response = await fetch(`${baseUrl}/detail_comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: getToken()
        }
    })
    const comment = await handleResponse(response, (json) => json)
    return comment
}
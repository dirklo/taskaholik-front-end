import { baseUrl, currentTask, handleResponse } from '../helpers/helpers'
import { getToken } from '../actions/auth'

export async function fetchTaskComments() {
    const response = await fetch(`${baseUrl}/task_comments?taskId=${currentTask().id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: getToken()
        }
    })
    const comments = await handleResponse(response, (json) => json)
    return comments
}

export async function createTaskComment(content) {
    const response = await fetch(`${baseUrl}/task_comments`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: getToken()
        },
        body: JSON.stringify({ task_comment: {
            task_id: currentTask().id,
            content: content
        }})
    })
    const comment = await handleResponse(response, (json) => json)
    return comment
}

export async function deleteTaskComment(commentId) {
    const response = await fetch(`${baseUrl}/task_comments/${commentId}`, {
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
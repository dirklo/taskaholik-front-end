const initialState = {
    details: [],
    detailAssignees: []
};

  
export default function detailReducer(state = initialState, action) {
    let index;
    let detail;
    
    switch (action.type) {
        case "SET_CURRENT_DETAIL":
            let newDetails = state.details.map(detail => {
                if (detail.id === Number(action.payload)) {
                    return {...detail, selected: true}
                } else {
                    return {...detail, selected: false}
                }
            })
            return {
                ...state,
                details: newDetails
            }
        case "POPULATE_DETAIL_ASSIGNEES":
            return {
                ...state,
                detailAssignees: [...action.payload]
            }
        case "POPULATE_DETAILS":
            return {
                ...state,
                details: [...action.payload]
            }
        case "COMPLETE_DETAIL":
            index = state.details.findIndex(detail => detail.id === action.payload.detail.id)
            detail = state.details[index]

            detail.completed = !action.payload.status

            return {
                ...state,
                details: [
                    ...state.details.slice(0, index), 
                    detail, 
                    ...state.details.slice(index + 1)
                ]
            }
        case "ADD_DETAIL":
            let newDetail = action.payload
            newDetail.selected = true
            return {
                ...state,
                details: [
                    ...state.details.map(detail => {
                        detail.selected = false
                        return detail
                    }), 
                    newDetail
                ]
            }
        case "UPDATE_DETAIL":
            index = state.details.findIndex(detail => detail.id = action.payload.id) 
            return {
                ...state, 
                details: [
                    ...state.details.slice(0, index),
                    action.payload,
                    ...state.details.slice(index + 1)
                ]
            }
        case "DELETE_DETAIL":
            return {
                ...state,
                details: [...state.details.filter(detail => detail.id !== action.payload)]
            }
        case "CLEAR_DETAILS":
            return {
                ...state,
                details: [],
                detailAssignees: []
            }
        case "ADD_ASSIGNEE":
            return {
                ...state,
                detailAssignees: [
                    ...state.detailAssignees, action.payload
                ]
            }
        case "REMOVE_ASSIGNEE":
            index = state.detailAssignees.findIndex(assignee => assignee.id === Number(action.payload))
            return {
                ...state,
                detailAssignees: [
                    ...state.detailAssignees.slice(0, index),
                    ...state.detailAssignees.slice(index + 1) 
                ]
            }
        case "TASK_CLEANUP":
            let cleanDetails = state.details
            return {
                ...state,
                details: [...cleanDetails.filter(detail => detail.taskId !== action.payload)]
            }
        default:
            return state;
    }
}
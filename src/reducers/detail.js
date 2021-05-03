const initialState = {
    details: [],
    detailComments: []
};

  
export default function populateReducer(state = initialState, action) {
    let index;
    let detail;
    
    switch (action.type) {
        case "SET_CURRENT_DETAIL":
            let newDetails = state.details.map(detail => {
                if (detail.id === action.payload.id) {
                    return {...detail, selected: true}
                } else {
                    return {...detail, selected: false}
                }
            })
            return {
                ...state,
                details: newDetails
            }
        case "POPULATE_DETAIL_COMMENTS":
            return {
                ...state,
                detailComments: [...action.payload]
            }
        case "POPULATE_DETAILS":
            return {
                ...state,
                details: [...action.payload]
            }
        case "COMPLETE_DETAIL":
            index = state.details.findIndex(detail => detail.id === action.payload.detail.id)
            detail = state.details[index]

            action.payload.status === 'complete' ?
            detail.completed = true : detail.completed = false

            return {
                ...state,
                details: [
                    ...state.details.slice(0, index), 
                    detail, 
                    ...state.details.slice(index + 1)
                ]
            }
        case "ADD_DETAIL":
            let newDetail = action.payload.detail
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
        case "DELETE_DETAIL":
            return {
                ...state,
                details: [...state.details.filter(detail => detail.id !== action.payload)]
            }
        default:
            return state;
    }
}
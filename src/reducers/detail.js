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
            index = state.details.findIndex(detail => detail.id === action.payload)
            detail = state.details[index]
            detail.completed = true
            return {
                ...state,
                details: [
                    ...state.details.slice(0, index), 
                    detail, 
                    ...state.details.slice(index + 1)
                ]
            }
        default:
            return state;
    }
}
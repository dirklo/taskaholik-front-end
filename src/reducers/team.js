const initialState = {
    teams: []
}

export default function teamReducer(state = initialState, action) {
    switch (action.type) {
        case "POPULATE_TEAMS":
            return {
                ...state,
                teams: [...action.payload]
            }
        default:
            return state
    }
}
const initialState = {
    projects: []
};
  
export default function populateReducer(state = initialState, action) {
    switch (action.type) {
        case "POPULATE_PROJECTS":
            return {
                ...state,
                projects: [...action.payload]
            }
      default:
        return state;
    }
}
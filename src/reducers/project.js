const initialState = {
    projects: []
};
  
export default function populateReducer(state = initialState, action) {
    let index;
    let project;

    switch (action.type) {
        case "POPULATE_PROJECTS":
            return {
                ...state,
                projects: [...action.payload]
            }
        case "SET_CURRENT_PROJECT":
            index = state.projects.findIndex(project => project.id === action.payload)
            project = state.projects[index] 
            project.selected = true;
            return {
                ...state,
                projects: [
                    ...state.projects.slice(0, index), 
                    project, 
                    ...state.projects.slice(index + 1)
                ]
            }
      default:
        return state;
    }
}
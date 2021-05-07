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
        case "SET_CURRENT_PROJECT":
            let newProjects = state.projects.map(project => {
                if (project.id === action.payload) {
                    project.selected = true
                    return project
                } else {
                    project.selected = false
                    return project
                }
            })
            return {
                ...state,
                projects: newProjects
            }
        case "ADD_PROJECT":
            return {
                ...state, 
                projects: [...state.projects, action.payload]
            }
        case "CLEAR_PROJECTS":
            return {
                ...state,
                projects: []
            }
      default:
        return state;
    }
}
const initialState = {
    projects: []
};
  
export default function projectReducer(state = initialState, action) {
    let newProjects

    switch (action.type) {
        case "POPULATE_PROJECTS":
            return {
                ...state,
                projects: [...action.payload]
            }
        case "SET_CURRENT_PROJECT":
            newProjects = state.projects.map(project => {
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
        case "DELETE_PROJECT":
            newProjects = state.projects.filter(project => 
                project.id !== action.payload
            )
            return {
                ...state, 
                projects: [...newProjects]
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
const initialState = {
    teams: [],
    projects: [],
    tasks: []
  };
  
  export default function populateReducer(state = initialState, action) {
    switch (action.type) {
        case "POPULATE_TEAMS":
            return {
                ...state,
                teams: [...action.payload]
            }
        case "POPULATE_PROJECTS":
            return {
                ...state,
                projects: [...action.payload]
            }
        case "POPULATE_TASKS":
            return {
                ...state,
                tasks: [...action.payload]
            }
      default:
        return state;
    }
  }
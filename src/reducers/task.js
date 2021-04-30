const initialState = {
    currentTask: '',
    taskComments: [],
    details: []
  };
  
  export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_TASK":
            return {
                ...state,
                currentTask: Number(action.payload)
            }
        case "POPULATE_TASK_COMMENTS":
            return {
                ...state,
                taskComments: [...action.payload]
            }
        case "POPULATE_DETAILS":
            return {
                ...state,
                details: [...action.payload]
            }
      default:
        return state;
    }
  }
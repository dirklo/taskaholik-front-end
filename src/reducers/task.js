const initialState = {
    currentTask: '',
    taskComments: [],
    details: []
  };
  
  export default function taskReducer(state = initialState, action) {
    let index;

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
        case "ADD_TASK_COMMENT":
            return {
                ...state,
                taskComments: [
                    ...state.taskComments, action.payload
                ]
            }
        case "REMOVE_TASK_COMMENT":
        index = state.taskComments.findIndex(item => item.id === Number(action.payload))
        return {
            ...state,
            taskComments: [
                ...state.taskComments.slice(0, index),
                ...state.taskComments.slice(index + 1) 
            ]
        }
      default:
        return state;
    }
  }
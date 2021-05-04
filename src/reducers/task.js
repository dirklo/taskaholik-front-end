const initialState = {
    tasks: [],
    taskComments: [],
  };
  
  export default function taskReducer(state = initialState, action) {
    let index;

    switch (action.type) {
        case "POPULATE_TASKS":
            return {
                ...state,
                tasks: [...action.payload]
            }
        case "POPULATE_TASK_COMMENTS":
            return {
                ...state,
                taskComments: [...action.payload]
            }
        case "SET_CURRENT_TASK":
            let newTasks = state.tasks.map(task => {
                if (task.id === action.payload) {
                    return {...task, selected: true}
                } else {
                    return {...task, selected: false}
                }
            })
            return {
                ...state,
                tasks: newTasks
            }
        case "ADD_TASK":
            let newTask = action.payload.task
            newTask.selected = true
            return {
                ...state,
                tasks: [
                    ...state.tasks.map(task => {
                        task.selected = false
                        return task
                    }), 
                    newTask
                ]
            }
        case "DELETE_TASK":
            index = state.tasks.findIndex(task => task.id === Number(action.payload))
            return {
                ...state,
                tasks: [...state.tasks.filter((task, idx) => idx !== index)]
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
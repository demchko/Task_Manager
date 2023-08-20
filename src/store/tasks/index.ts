import {TasksAction, TasksState} from "../types";


const initialState: TasksState = {
    tasks: [],
}

export default function TasksReducer(state=initialState, action: TasksAction){
    switch (action.type){
        case "Set_Task":
            return {...state.tasks, tasks: [...state.tasks, action.payload]}
        case "Remove_Task":
            return {...state, tasks: state.tasks.filter(task => task.id !== action.payload.id)}
        case "Edit_Task":
            const updatedTasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return {...task, ...action.payload}; // Merge changes
                }
                return task;
            });
            return {...state, tasks: updatedTasks};
        default:
            return state
    }
}
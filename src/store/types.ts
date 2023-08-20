import {IUser} from "./IUser";
import {ITasks} from "./ITasks";
import {IEdit} from "./IEdit";

export interface AuthState{
    auth: boolean;
    user: IUser
}

export interface TasksState{
    tasks: ITasks[]
}

export interface SetAuthAction{
    type: "Set_Auth";
    payload: boolean
}

export interface SetUserAction{
    type: "Set_User";
    payload: IUser
}


//Tasks

export interface SetTasksAction{
    type: "Set_Task";
    payload: ITasks
}

export interface RemoveTaskAction{
    type: "Remove_Task";
    payload: ITasks;
}

export interface EditTaskAction{
    type: "Edit_Task";
    payload: IEdit;
}

export type AuthAction = SetAuthAction | SetUserAction;
export type TasksAction = SetTasksAction | RemoveTaskAction | EditTaskAction;

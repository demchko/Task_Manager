import {AuthAction, AuthState} from "../types";
import {IUser} from "../IUser";

const initialState: AuthState = {
    auth: false,
    user: {} as IUser,
}

export default function AuthReducer(state = initialState, action: AuthAction){
    switch (action.type){
        case "Set_Auth":
            return {...state, auth: action.payload}
        case "Set_User":
            return {...state, user: action.payload}
        default:
            return state
    }
}


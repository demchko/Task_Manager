import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import AuthReducer from './auth/index';
import TasksReducer from "./tasks/index";

const RootReducer = combineReducers({
    AuthReducer,
    TasksReducer
});

export const store = createStore(RootReducer, applyMiddleware(thunk));

export type RootType = ReturnType<typeof store.getState>
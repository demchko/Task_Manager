import Login from "../pages/Login";
import Main from "../pages/Main";
import React from "react";
import Task from "../pages/Task";

export interface IRoute{
    path: string;
    element: React.ComponentType<any>;
}

export const publicRoutes: IRoute[] = [
    {path: '/login', element: Login}
]

export const privateRoutes: IRoute[] = [
    {path: '/main', element: Main},
    {path: '/task/:id', element: Task}
]
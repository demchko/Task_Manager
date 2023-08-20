import React, {Dispatch, useEffect} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import {useDispatch} from "react-redux";
import {IUser} from "./store/IUser";

const App = () => {

    const dispatch:Dispatch<any> = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('auth')){
            const user:IUser = {
                username: localStorage.getItem('username') || '',
                password: ''
            }

            dispatch({type: "Set_User", payload: user});
            dispatch({type: "Set_Auth", payload: true});
        }
    }, []);

    return (
        <div>
          <Header />
          <AppRouter />
        </div>
    );
};

export default App;
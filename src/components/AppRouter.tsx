import React, {FC} from 'react';
import {privateRoutes, publicRoutes} from "../router";
import {Navigate, Route, Routes} from "react-router-dom";
import {useTypedSelector} from "../hooks/UseTypedSelector";

const AppRouter:FC = () => {

    const {auth} = useTypedSelector(state => state.AuthReducer);

    return (
        <div>
            <Routes>
                {auth
                    ? privateRoutes.map(item => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={React.createElement(item.element)}
                        />
                    ))
                    : publicRoutes.map(item => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={React.createElement(item.element)}
                        />
                    ))
                }
                <Route path='*' element={<Navigate to={auth ? '/main' : '/login'} />} />
            </Routes>

        </div>
    );
};

export default AppRouter;
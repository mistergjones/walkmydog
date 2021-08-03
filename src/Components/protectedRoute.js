import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../context/authContext';
import storageService from '../storage/localStorage';

function ProtectedRoute({ path, component: Component, render, ...otherProps }) {
    const { user } = useContext(AuthContext)
    return (
        <Route
            {...otherProps}
            render={(props) => {
                if (!user) {
                    storageService.removeToken();
                    return <Redirect to="/login" />
                }
                return Component ? <Component {...props} /> : render(props)
            }} />
    );
}

export default ProtectedRoute;
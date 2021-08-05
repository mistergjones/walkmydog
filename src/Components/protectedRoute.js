/**
 * This will check to see if we have a user if the is no user redirects to
 * login screen if there is a user go to the intended component that is 
 * passed in.
 */

import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../context/authContext';
import routes from '../routes/routes';
import storageService from '../storage/localStorage';

function ProtectedRoute({ path, component: Component, render, ...otherProps }) {
    const { user } = useContext(AuthContext)

    return (
        <Route
            {...otherProps}
            render={(props) => {
                if (!user) {
                    storageService.removeToken();
                    return <Redirect to={routes.LOGIN} />
                }
                return Component ? <Component {...props} /> : render(props)
            }} />
    );
}

export default ProtectedRoute;
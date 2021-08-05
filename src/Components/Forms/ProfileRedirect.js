/**
 * This is designed to check if there is a user and determine 
 * if they have a profile. If they have a profile they will be 
 * redirected to dashboard otherwise go to profile screen.
 * 
 * If there is no user retuns null doesn't do anything.
 * 
 */

import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import routes from '../../routes/routes';


function ProfileRedirect(props) {
    const { user } = useContext(AuthContext);

    if (user) {
        return user.hasProfile ? <Redirect to={routes.DASHBOARD} /> :
            <Redirect to={routes.PROFILE} />
    }

    return null;

}


export default ProfileRedirect;


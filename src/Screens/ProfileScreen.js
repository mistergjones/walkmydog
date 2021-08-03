import React from 'react';
import MasterScreen from './Master/MasterScreen';

import "./ProfileScreen.css"
import ProfileContent from './ProfileContent';

function ProfileScreen(props) {
    return (
        <div className="new-listing-screen-container">
            <MasterScreen
                ScreenComponent={ProfileContent}
                heading={"Create Profile"}
            />
        </div>
    );
}

export default ProfileScreen;
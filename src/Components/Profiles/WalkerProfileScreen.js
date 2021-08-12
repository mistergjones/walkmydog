import React from 'react';
import "./WalkerProfileScreen.css"

import MasterScreen from '../../Screens/Master/MasterScreen';
import WalkerProfileContent from './WalkerProfileContent';



function WalkerProfileScreen(props) {
    return (
        <div className="">
            <MasterScreen
                ScreenComponent={WalkerProfileContent}
                heading={"Walker Profile"}
            />
        </div>
    );
}

export default WalkerProfileScreen;
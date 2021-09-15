import React from 'react';
import "./WalkerProfileScreen.css"

import MasterScreen from '../../Screens/Master/MasterScreen';
import WalkerProfileEditContent from './WalkerProfileEditContent';



function WalkerProfileEditScreen(props) {
    return (
        <div className="">
            <MasterScreen
                ScreenComponent={WalkerProfileEditContent}
                heading={"Walker Profile Edit"}
            />
        </div>
    );
}

export default WalkerProfileEditScreen;
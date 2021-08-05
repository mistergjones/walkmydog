import React from 'react';
import MasterScreen from './Master/MasterScreen';
import DashboardContent from './DashboardContent';

function DashboardScreen(props) {
    return (
        <div className="">
            <MasterScreen
                ScreenComponent={DashboardContent}
                heading="Dashboard"
            />
        </div>
    );
}

export default DashboardScreen;
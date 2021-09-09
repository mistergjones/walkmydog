import React from "react";
import MasterScreen from "./Master/MasterScreen";
import WalkerDashboardContent from "./WalkerDashboardContent.js";

function WalkerDashboardScreen(props) {
    return (
        <div className="">
            <MasterScreen
                ScreenComponent={WalkerDashboardContent}
                heading="Walker Dashboard"
            />
        </div>
    );
}

export default WalkerDashboardScreen;

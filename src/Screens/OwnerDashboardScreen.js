import React from "react";
import MasterScreen from "./Master/MasterScreen";
import OwnerDashboardContent from "./OwnerDashboardContent";

function OwnerDashboardScreen(props) {
    return (
        <div className="">
            <MasterScreen
                ScreenComponent={OwnerDashboardContent}
                heading="Owner Dashboard"
            />
        </div>
    );
}

export default OwnerDashboardScreen;

import React from "react";
import "./OwnerProfileScreen.css";
import MasterScreen from "./Master/MasterScreen";
import OwnerProfileContent from "./OwnerProfileContent";

function OwnerProfileScreen(props) {
    return (
        <div>
            <MasterScreen
                ScreenComponent={OwnerProfileContent}
                heading={"Owner Profile Form"}
            />
        </div>
    );
}

export default OwnerProfileScreen;

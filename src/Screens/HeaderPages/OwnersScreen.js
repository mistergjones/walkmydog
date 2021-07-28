import React from "react";
import MasterScreen from "../Master/MasterScreen";
import OwnersContent from "./OwnersContent";

function OwnersScreen(props) {
    return (
        <div className="new-listing-screen-container">
            <MasterScreen
                ScreenComponent={OwnersContent}
                heading={"Owners Screen"}
            />
        </div>
    );
}

export default OwnersScreen;

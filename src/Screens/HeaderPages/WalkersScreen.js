import React from "react";
import MasterScreen from "../Master/MasterScreen";
import WalkersContent from "./WalkersContent";

function WalkersScreen(props) {
    return (
        <div className="new-listing-screen-container">
            <MasterScreen
                ScreenComponent={WalkersContent}
                heading={"Walkers Screen"}
            />
        </div>
    );
}

export default WalkersScreen;

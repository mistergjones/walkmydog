import React from "react";
import MasterScreen from "./Master/MasterScreen";
import NewListingsContent from "./NewListingsContent";
import "./NewListingsScreen.css";

function NewListingScreen(props) {
    return (
        <div className="new-listing-screen-container">
            <MasterScreen
                ScreenComponent={NewListingsContent}
                heading={"New Listings in your area"}
            />
        </div>
    );
}

export default NewListingScreen;

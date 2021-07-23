import React from "react";
import MasterScreen from "./MasterScreen";
import NewListings from "./NewListings";
import "./NewListingScreen.css";

function NewListingScreen(props) {
    return (
        <div className="new-listing-screen-container">
            <MasterScreen
                ScreenComponent={NewListings}
                heading={"New Listings in your area"}
            />
        </div>
    );
}

export default NewListingScreen;

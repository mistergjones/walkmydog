import React from "react";
import "./HomeScreen.css";
import MasterScreen from "../Master/MasterScreen";
import HomeContent from "./HomeContent";

function HomeScreen(props) {
    return (
        <div className="home-screen-container">
            <MasterScreen
                ScreenComponent={HomeContent}
                heading="08/02/21 Welcome to Walk My Dog (under development)"
            />
        </div>
    );
}

export default HomeScreen;

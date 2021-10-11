import React from "react";
import "./HomeScreen.css";
import MasterScreen from "../Master/MasterScreen";
import HomeContent from "./HomeContent";

function HomeScreen(props) {
    return (
        <div className="home-screen-container">
            <MasterScreen
                ScreenComponent={HomeContent}
                heading="Welcome to Walk My Dog (glen and peter)"
            />
        </div>
    );
}

export default HomeScreen;

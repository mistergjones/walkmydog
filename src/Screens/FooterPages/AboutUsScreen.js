import React from "react";
import MasterScreen from "../Master/MasterScreen";
import AboutUsContent from "./AboutUsContent";

function AboutUsScreen(props) {
    return (
        <div>
            <div className="about-us-screen-container">
                <MasterScreen
                    ScreenComponent={AboutUsContent}
                    heading={"About Us Screen"}
                />
            </div>
        </div>
    );
}

export default AboutUsScreen;

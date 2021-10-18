import React from "react";
import SocialContent from "./SocialContent";
import MasterScreen from "../Master/MasterScreen";

function SocialScreen(props) {
    return (
        <div className="">
            <MasterScreen
                ScreenComponent={SocialContent}
                heading="Social Dashboard"
            />
        </div>
    );
}

export default SocialScreen;

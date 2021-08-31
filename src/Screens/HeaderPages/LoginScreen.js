import React from "react";
import MasterScreen from "../Master/MasterScreen";
import LoginContent from "./LoginContent";

function LoginScreen(props) {
    return (
        <div className="new-listing-screen-container">
            <MasterScreen
                ScreenComponent={LoginContent}
                heading={"Login"}
            />
        </div>
    );
}

export default LoginScreen;

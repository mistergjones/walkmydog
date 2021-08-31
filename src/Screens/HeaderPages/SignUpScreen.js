import React from "react";
import MasterScreen from "../Master/MasterScreen";
import SignUpContent from "./SignUpContent";
import "./SignUpScreen.css";

function SignUpScreen(props) {
    return (
        <div className="new-listing-screen-container">
            <MasterScreen
                ScreenComponent={SignUpContent}
                heading={"Sign Up"}
            />
        </div>
    );
}

export default SignUpScreen;

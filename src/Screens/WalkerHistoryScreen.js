import React from "react";
import "./WalkerHistoryScreen.css";
import MasterScreen from "./Master/MasterScreen";
import WalkerHistoryContent from "./WalkerHistoryContent.js";

export default function WalkerHistoryScreen() {
    return (
        <div className="">
            <MasterScreen
                ScreenComponent={WalkerHistoryContent}
                heading="Walker History Content Screen"
            />
        </div>
    );
}

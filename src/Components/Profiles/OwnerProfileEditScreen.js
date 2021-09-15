import React from "react";
import "./OwnerProfileScreen.css";
import MasterScreen from "../../Screens/Master/MasterScreen";
import OwnerProfileEditContent from "./OwnerProfileEditContent";

function OwnerProfileEditScreen(props) {
    return (
        <div>
            <MasterScreen
                ScreenComponent={OwnerProfileEditContent}
                heading={"Owner Profile Edit Form"}
            />
        </div>
    );
}

export default OwnerProfileEditScreen;
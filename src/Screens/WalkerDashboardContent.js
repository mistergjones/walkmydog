import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes/routes";
import "./WalkerDashboardContent.css";

function WalkerDashboardContent(props) {
    return (
        <div>
            <h1>Hello there...dashboards...</h1>
            <h1>Note: This is the Walker Dashboard Screen</h1>
            <NavLink to={routes.EDIT_PROFILE_WALKER}> Edit </NavLink>

        </div>
    );
}

export default WalkerDashboardContent;

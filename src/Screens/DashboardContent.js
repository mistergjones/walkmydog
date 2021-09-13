import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes/routes";

function DashboardContent(props) {
    return (
        <div>
            <h1>Hello there...dashboards...</h1>
            <h1>
                Note: Both Walker and Owner point to this dashboard upon
                sucessful signup & login


            </h1>

            <NavLink to={routes.CREATE_LISTING_OWNER}>Book</NavLink>
        </div>
    );
}

export default DashboardContent;

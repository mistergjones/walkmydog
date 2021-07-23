import React from "react";
import "./MainFooter.css";
import FooterNavigation from "./FooterNavigation";

function MainFooter(props) {
    return (
        <div className="main-footer">
            <h1>Footer Logo</h1>
            <FooterNavigation />
        </div>
    );
}

export default MainFooter;

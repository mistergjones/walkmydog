import React from "react";
import "./FooterNavigation.css";

function FooterNavigation(props) {
    return (
        <div className="footer-navigation">
            <ul>
                <li>
                    <a href="/Social">Social</a>
                </li>
                <li>
                    <a href="/Search">Search</a>
                </li>
                <li>
                    <a href="/Locations">Locations</a>
                </li>
                <li>
                    <a href="/About-Us">About Us</a>
                </li>
                <li>
                    <a href="/TOS">Terms</a>
                </li>
            </ul>
        </div>
    );
}

export default FooterNavigation;

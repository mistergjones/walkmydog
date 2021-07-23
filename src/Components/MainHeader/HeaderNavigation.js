import React from "react";

import "./HeaderNavigation.css";

// take the props from MAINHEADER and conditionally render the items if based on LOGGED IN.
const HeaderNavigation = (props) => {
    return (
        <div className="navigation">
            <ul>
                {/* {props.isLoggedIn && (
                    <li>
                        <a href="/">Walkers</a>
                    </li>
                )}
                {props.isLoggedIn && (
                    <li>
                        <a href="/Owners">Owners</a>
                    </li>
                )} */}
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/">Walkers</a>
                </li>
                <li>
                    <a href="/Owners">Owners</a>
                </li>

                <li>
                    <a href="/FAQ">FAQ</a>
                </li>
                <li>
                    <a href="/SignUp">SignUp</a>
                </li>
                <li>
                    <a href="/Login">Login</a>
                </li>
                {props.isLoggedIn && (
                    <li>
                        <button onClick={props.onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default HeaderNavigation;

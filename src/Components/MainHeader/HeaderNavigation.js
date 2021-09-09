import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/authContext";
import routes from "../../routes/routes";
import storageService from "../../storage/localStorage";

import "./HeaderNavigation.css";

// take the props from MAINHEADER and conditionally render the items if based on LOGGED IN.
const HeaderNavigation = (props) => {
    const { user, setUser } = useContext(AuthContext);
    const type = !user ? null : user.type;
    return (
        <div className="navigation">
            <ul>
                <li>
                    <NavLink to={routes.HOME}> Home</NavLink>
                </li>
                {type === "W" && (
                    <li>
                        <NavLink to={routes.HISTORY}>Walker History</NavLink>
                    </li>
                )}
                {type && (
                    <li>
                        <NavLink to={routes.NEW_LISTINGS}> Listings</NavLink>
                    </li>
                )}
                {type === "W" && (
                    <li>
                        <NavLink to={routes.WALKERS}> Walkers</NavLink>
                    </li>
                )}
                {type === "O" && (
                    <li>
                        <NavLink to={routes.OWNERS}>Owners</NavLink>
                    </li>
                )}

                {!user && (
                    <li>
                        <NavLink to={routes.SIGN_UP}>SignUp</NavLink>
                    </li>
                )}
                {!user ? (
                    <li>
                        <NavLink to={routes.LOGIN}> Login</NavLink>
                    </li>
                ) : (
                    <li>{user.email}</li>
                )}
                {user && (
                    <li>
                        <NavLink
                            to={routes.HOME}
                            onClick={() => {
                                storageService.removeToken();
                                setUser(null);
                            }}
                        >
                            Logout
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default HeaderNavigation;

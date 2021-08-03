import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/authContext";
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
                    <NavLink to="/"> Home</NavLink>
                </li>
                <li>
                    <NavLink to="/newlistings"> Listings</NavLink>
                </li>
                {type === "W" && <li>
                    <NavLink to="/walkers"> Walkers</NavLink>
                </li>}
                {type === "O" && <li>
                    <NavLink to="/owners">Owners</NavLink>
                </li>}

                {!user && (<li>
                    <NavLink to="/signup">SignUp</NavLink>
                </li>)}
                {!user ? <li>
                    <NavLink to="/login"> Login</NavLink>
                </li> : <li>{user.email}</li>}
                {user && (
                    <li>
                        <NavLink to="/" onClick={() => { storageService.removeToken(); setUser(null) }}>Logout</NavLink>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default HeaderNavigation;

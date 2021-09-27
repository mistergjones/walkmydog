import React, { useState, useEffect } from "react";
import "./Profile.css";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";

// GJ: 15/05: WalkerDashboard componeent passes user token info as props here
function Profile(props) {
    const [isWalker, setIsWalker] = useState(null);

    // the below ensures we use the TYPE to determine walker or owner to CONDTIONTALLY RENDER BLEOW
    useEffect(() => {
        if (props.data.type === "W") {
            setIsWalker(true);
        } else {
            setIsWalker(false);
        }
    }, [isWalker]);

    return (
        <div>
            <div className="profile-container">
                <table className="tbl tbl--block fixed-header">
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.data.firstname}</td>
                            <td>{props.data.lastname}</td>
                            <td>{props.data.email}</td>
                            {isWalker && (
                                <td>
                                    <NavLink to={routes.EDIT_PROFILE_WALKER}>
                                        Edit Profile
                                    </NavLink>
                                </td>
                            )}

                            {!isWalker && (
                                <td>
                                    <NavLink to={routes.EDIT_PROFILE_OWNER}>
                                        Edit Profile
                                    </NavLink>
                                </td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Profile;

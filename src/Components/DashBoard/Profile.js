import React from "react";
import "./Profile.css";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";

// GJ: 15/05: WalkerDashboard componeent passes user token info as props here
function Profile(props) {
    return (
        <div className="profile-container">
            <table className="tbl tbl--block fixed-header">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        {/* <th>Street Address</th>
                        <th>Suburb</th>
                        <th>Postcode</th> */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.data.firstname}</td>
                        <td>{props.data.lastname}</td>
                        <td>{props.data.email}</td>

                        <td>
                            <NavLink to={routes.EDIT_PROFILE_WALKER}>
                                Edit Profile
                            </NavLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Profile;

import React from "react";
import "./Profile.css";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";

function Profile(props) {
    return (
        <div className="profile-container">
            <table className="tbl tbl--block">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Street Address</th>
                        <th>Suburb</th>
                        <th>Postcode</th>
                        <th>Action</th>
                        <th>Other</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Anne</td>
                        <td>Franklin</td>
                        <td>3 Smith Street</td>
                        <td>Melbourne</td>
                        <td>3000</td>
                        <td>
                            <NavLink to={routes.EDIT_PROFILE_WALKER}>
                                {" "}
                                Edit{" "}
                            </NavLink>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Profile;

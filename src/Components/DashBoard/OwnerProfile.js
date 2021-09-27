import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/routes';

function OwnerProfile({ owner }) {
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{owner.firstname}</td>
                        <td>{owner.lastname}</td>
                        <td>{owner.street_address}</td>
                        <td>{owner.suburb}</td>
                        <td>{owner.postcode}</td>
                        <td>
                            <NavLink to={routes.EDIT_PROFILE_OWNER}>

                                Edit
                            </NavLink>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default OwnerProfile;
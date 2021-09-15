import React, { useContext, useState, useEffect } from "react";
import routes from "../routes/routes";
import { NavLink } from "react-router-dom";
import AuthContext from '../context/authContext';
import useApi from "../hooks/useApi";
import ownersApi from "../api/owners"
import { formatAusDate } from "../Helpers/convertDateTime";
import "./../Screens/OwnerDashboardContent.css"



function OwnerDashBoardContentScreen(props) {
    const { user } = useContext(AuthContext);
    const { request: getOwnerProfile } = useApi(ownersApi.getOwnerProfile);
    const [owner, setOwner] = useState();


    const loadOwnerDetails = async () => {
        const { data } = await getOwnerProfile(user.id);
        setOwner(data);

    }
    useEffect(() => {
        loadOwnerDetails();


    }, []);

    return (

        <div>
            {owner && <div className="owner-profile-grid">

                <div className="owner-profile-grid-column">
                    <p>First Name: {owner.firstname}</p>
                    <p>Last Name: {owner.lastname}</p>
                    {/* <p>D.O.B: {formatAusDate(owner.dob)}</p> */}
                    <p>Mobile: {owner.mobile}</p>
                </div>
                <div>
                    <p>Address: {owner.street_address}</p>
                    <p>Post Code: {owner.postcode}</p>
                    <p>Suburb: {owner.suburb}</p>
                    <p>State: {owner.state}</p>
                </div>
                <div>
                    <p>Dog Name: {owner.dog_firstname}</p>
                    <p>Dog Size: {owner.dog_size}</p>
                    <p>Dog Photo: {owner.dog_photo}</p>
                </div>
                <div>
                    <NavLink to={routes.EDIT_PROFILE_OWNER}> Edit </NavLink>
                </div>
            </div>}
            <div>
                past jobs
            </div>
            <div>
                upcoming jobs
            </div>
            <div>
                Book New jobs
                <NavLink
                    to={routes.CREATE_LISTING_OWNER}
                >
                    Book
                </NavLink>
            </div>
        </div>
    );
}

export default OwnerDashBoardContentScreen;

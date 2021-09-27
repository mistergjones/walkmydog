import React, { useContext, useState, useEffect } from "react";
import routes from "../routes/routes";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/authContext";
import useApi from "../hooks/useApi";
import ownersApi from "../api/owners";
import bookingsApi from "../api/bookings";
import { formatAusDate } from "../Helpers/convertDateTime";
import "./../Screens/OwnerDashboardContent.css"
import OwnerProfile from "../Components/DashBoard/OwnerProfile";

// 19/09: GJ: added the below components for Owner Dashboard
import Profile from "../Components/DashBoard/Profile";

import OwnerHistory from "../Components/DashBoard/OwnerHistory";
import OwnerUpcoming from "../Components/DashBoard/OwnerUpcoming";
import NewListings from "../Components/DashBoard/NewListings";

function OwnerDashBoardContentScreen(props) {
    const { user, setUser } = useContext(AuthContext);
    const { request: getOwnerProfile } = useApi(ownersApi.getOwnerProfile);
    const { request: getCompletedJobsForOwner } = useApi(
        bookingsApi.getCompletedJobsForOwner
    );
    const { request: getAssignedJobsForOwner } = useApi(
        bookingsApi.getAssignedJobsForOwner
    );

    const {
        // data: walkerHistoricalCompletions,
        request: cancelAssignedWalk,
    } = useApi(bookingsApi.cancelBooking);

    const [owner, setOwner] = useState();
    const [gotPastJobsData, setGotPastJobsData] = useState(false);
    const [gotAssignedJobsData, setAssignedJobsData] = useState(false);
    const [isPastWalkDataLoaded, setIsPastWalkDataLoaded] = useState(false);
    const [isAssignedWalkDataLoaded, setIsAssignedWalkDataLoaded] = useState(
        false
    );

    // this function will run when a OWNER wants to cancel a ASSIGNED walk.
    // The function is passed to the child with this function receiving the "booking_id_value"
    const handleCancellation = async (booking_id_value) => {
        try {
            // 0. Establish a data object to capture the Booking ID and OWNER ID to pass through to the DELETE booking route
            const ownerBookingIDObj = {};

            // 1. Obtain relevant data and place in data object
            const bookingID = booking_id_value.target.value;
            ownerBookingIDObj.owner_id = owner.owner_id;
            ownerBookingIDObj.booking_id = bookingID;

            // 2. Now pass the data through as a data object to the route and get result
            const result = await cancelAssignedWalk(
                bookingID,
                ownerBookingIDObj
            );

            // 3. If result is true. Reload the updated Upcoming Assigned Services.
            // If FALSE, don't do anything
            if (result.data.data === true) {
                // Set to FALSE to re-render the data
                setIsAssignedWalkDataLoaded(false);
            }
        } catch (error) {
            console.log(
                "OnwerDashboard.js => Handle Cancelleation => WHAT IS THE ERROR",
                error
            );
        }
    };

    useEffect(() => {
        const loadOwnerDetails = async () => {
            const { data } = await getOwnerProfile(user.id);
            setOwner(data);
        };
        // GJ: 20/09: load the completed jobs for the owner
        const loadCompletedJobs = async () => {
            const { data } = await getCompletedJobsForOwner(user.id);
            setGotPastJobsData(data);
            setIsPastWalkDataLoaded(true);
        };

        // GJ: 21/09: load the Upcoming Jobs for the owner
        //TODO: NEED TO DO ALL TEH BACKEND STUFF FOR THIS
        const loadAssignedJobs = async () => {
            const { data } = await getAssignedJobsForOwner(user.id);
            // store data via the set statement
            setAssignedJobsData(data);
            // update a flag to true so we can use this to conditionally render the table
            setIsAssignedWalkDataLoaded(true);
        };

        loadOwnerDetails();
        loadCompletedJobs();
        loadAssignedJobs();
    }, [isPastWalkDataLoaded, isAssignedWalkDataLoaded]);

    return (
        <div>
            {/* 19/09: GJ - Added the below code to render the same as walker */}
            <div className="walker-dashboard-content-container">
                {owner && (
                    <div className="area-border">
                        <h3>Profile</h3>
                        <div className="area1">
                            <Profile data={user} />
                        </div>
                    </div>
                )}

                {gotPastJobsData && (
                    <div className="area-border">
                        <h3>Past Jobs</h3>
                        <div className="area2">
                            <OwnerHistory data={gotPastJobsData} />
                        </div>
                    </div>
                )}

                {isAssignedWalkDataLoaded && (
                    <div className="area-border">
                        <h3>Upcoming jobs assigned (cancel not working yet)</h3>
                        <OwnerUpcoming
                            data={gotAssignedJobsData}
                            handleCancel={handleCancellation}
                        />
                    </div>
                )}

                {/* {owner && (
                <div className="owner-profile-grid">
                    <div className="owner-profile-grid-column">
                        <p>First Name: {owner.firstname}</p>
                        <p>Last Name: {owner.lastname}</p>
                        
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
                </div>
            )} */}

                <div className="area-border">
                    <h3>Create New Listing</h3>
                    <NavLink to={routes.CREATE_LISTING_OWNER}>Book</NavLink>
                </div>
            </div>
        </div>
    );
}

export default OwnerDashBoardContentScreen;

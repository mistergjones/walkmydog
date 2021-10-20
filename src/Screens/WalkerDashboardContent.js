import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes/routes";
import "./WalkerDashboardContent.css";
import AuthContext from "../context/authContext";
import useApi from "../hooks/useApi";
import walkersApi from "../api/walker";
import bookingsApi from "../api/bookings";

import Profile from "../Components/DashBoard/Profile";
import History from "../Components/DashBoard/History";
import Upcoming from "../Components/DashBoard/Upcoming";
import NewListings from "../Components/DashBoard/NewListings";

function WalkerDashboardContent(props) {
    const [show, setShow] = useState(null);

    // required to obtain the credential id from the context
    const { user, setUser } = useContext(AuthContext);

    // now need to get the data and push into the components
    const [walkerCompletedJobs, setWalkerCompletedJobs] = useState(null);
    const [walkerHistoricalIncome, setWalkerHistoricalIncome] = useState(null);
    const [upcomingWalks, setUpcomingWalks] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isAssignedWalkDataLoaded, setAssignedWalkDataLoaded] = useState(
        false
    );

    // lets just get the data from the database. Destructuring and storing data straight away
    const {
        // data: walkerHistoricalCompletions,
        request: getWalkerHistoricalCompletions,
    } = useApi(walkersApi.getWalkerHistoricalCompletions);

    // GJ: 14/09: Get teh walks assigned to the walker
    const {
        // data: walkerHistoricalCompletions,
        request: getAssignedWalks,
    } = useApi(walkersApi.getAssignedWalks);

    // GJ: 15/09: The below is used to enable the CANCELLCATION of an assigned Walk/Booking
    const {
        // data: walkerHistoricalCompletions,
        request: cancelAssignedWalk,
    } = useApi(bookingsApi.cancelBooking);

    // GJ: 29/09: Teh bleow is used to suppliy the handleCompletion() for a walker to complete a job.
    const { request: updateBookingCompletedByWalker } = useApi(
        bookingsApi.updateBookingCompletedByWalker
    );

    // this function will run when a walker wants to cancel a ASSIGNED walk.
    // The function is passed to the child with this function receiving the "booking_id_value"
    const handleCancellation = async (booking_id_value) => {
        try {
            // 0. Establish a data object to capture the Booking ID and Walker ID to pass through to the DELETE booking route
            const walkerBookingIDObj = {};
            // 1. Obtain relevant data and place in data object
            // const bookingID = booking_id_value.target.value;
            const bookingID = booking_id_value.booking_id;
            walkerBookingIDObj.walker_id = upcomingWalks[0].walker_id;
            walkerBookingIDObj.booking_id = bookingID;
            walkerBookingIDObj.type = user.type;

            // 2. Now pass the data through as a data object to the route and get result
            const result = await cancelAssignedWalk(
                bookingID,
                walkerBookingIDObj
            );

            // 3. If result is true. Reload the updated Upcoming Assigned Services.
            // If FALSE, don't do anything
            if (result.data.data === true) {
                // Set to FALSE to re-render the data
                setAssignedWalkDataLoaded(false);
            }
        } catch (error) {
            console.log("ERROR", booking_id_value);
            console.log("WHA IS THE HANDLE CANCELATIN ERROR", error);
        }
    };

    // GJ: pass this function to the children component and obtain the
    // the booking_id value
    const handleCompletion = async (bookingIDWalkerMapProofDataObj) => {
        try {
            // obtain teh walkerid and walker map url link to pass through to the query
            const infoObj = {};
            infoObj.walker_id = upcomingWalks[0].walker_id;
            infoObj.walker_map_proof =
                bookingIDWalkerMapProofDataObj.walk_proof;

            //capture the booking_id value
            //const bookingId = bookingIDWalkerMapProofDataObj.target.value;
            const bookingId = bookingIDWalkerMapProofDataObj.booking_id;
            // const walkerMapUrl = bookingIDWalkerMapProofDataObj.walkProof;

            // now the walker will update the job to be completed
            updateBookingCompletedByWalker(bookingId, infoObj);
            // reload the Assigned / Upcoming tables
            setAssignedWalkDataLoaded(false);
        } catch (error) {
            console.log("GLEN: ", bookingIDWalkerMapProofDataObj);
            console.log(
                "WalkerDashboardContent -> Error in updateBookingCompletedByWalker: ",
                error
            );
        }
    };

    useEffect(() => {
        // this approach is way to only render this once and set the loaded status
        // get the Walker Data and and split into its different datasets
        const getWalkerInformation = async () => {
            const tempWalkerDataObject = await getWalkerHistoricalCompletions(
                user.id
            );
            setWalkerCompletedJobs(tempWalkerDataObject.data.walkerInfo);
            setWalkerHistoricalIncome(
                tempWalkerDataObject.data.walkerIncomeInfo
            );

            // The components will not show unless this flag is set to true
            setIsDataLoaded(true);
        };
        //GJ: 14/09: This function retrieves the assigned walks to a walker
        const getAssignedWalkData = async () => {
            const tempAssignedWalks = await getAssignedWalks(user.id);
            setUpcomingWalks(tempAssignedWalks.data);
            setAssignedWalkDataLoaded(true);
        };

        getWalkerInformation();
        getAssignedWalkData();
    }, [isDataLoaded, isAssignedWalkDataLoaded]);

    return (
        <>
            <div className="walker-dashboard-content-container">
                <div className="area-border">
                    <h3>Profile</h3>
                    <div className="area1">
                        <Profile data={user} />
                    </div>
                </div>
                {isDataLoaded && (
                    <div className="area-border">
                        <h3>Historical Services</h3>

                        <div className="area2">
                            <History data={walkerCompletedJobs} />
                        </div>
                    </div>
                )}

                {isAssignedWalkDataLoaded && (
                    <div className="area-border">
                        <h3>Upcoming Assigned Services </h3>
                        <div className="area3">
                            <Upcoming
                                data={upcomingWalks}
                                handleCancel={handleCancellation}
                                handleCompletion={handleCompletion}
                            />
                        </div>
                    </div>
                )}

                {/* <div className="area-border">
                    <div className="area4">
                        <h3>New Listings</h3>
                        <NewListings />
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default WalkerDashboardContent;

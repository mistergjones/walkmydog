import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ListingsDetailContent.css";

import useApi from "../hooks/useApi";
import bookingsApi from "../api/bookings";
import WalkerInfoCard from "../Components/UI/Card/WalkerInfoCard";
import JobInfoCard from "../Components/UI/Card/JobInfoCard";
import DogInfoCard from "../Components/UI/Card/DogInfoCard";
import AuthContext from "../context/authContext";
import { useHistory, useLocation } from "react-router-dom";
import routes from "../routes/routes";

function ListingsDetailContent(props) {
    const { bookingId } = useParams();
    const { user } = useContext(AuthContext);
    const { data, request: getBooking } = useApi(bookingsApi.getBookingDetails);
    const { request: updateBooking } = useApi(bookingsApi.updateBooking);
    let history = useHistory();

    const loadData = async () => {
        try {
            await getBooking(bookingId, user.type);
        } catch (error) {
            console.log("error = ", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async () => {
        // if (window.confirm("confirm booking")) {
        //     try {
        //         await updateBooking({
        //             status: user.type === "W" ? "A" : "C",
        //             bookingId,
        //             walkerAssigned: user.id,
        //         });
        //         history.push(
        //             user.type === "W"
        //                 ? routes.DASHBOARD_WALKER
        //                 : routes.DASHBOARD_OWNER
        //         );
        //     } catch (error) {}
        // }

        try {
            await updateBooking({
                status: user.type === "W" ? "A" : "C",
                bookingId,
                walkerAssigned: user.id,
            });
            history.push(
                user.type === "W"
                    ? routes.DASHBOARD_WALKER
                    : routes.DASHBOARD_OWNER
            );
        } catch (error) {}
    };

    // The purpose of the below is to use useLocation() to determien if the "BOOK" button should be showed based on where the user came from. If they came from WALKER HISTORY to then view a job, don't show "BOOK"
    let location = useLocation();
    // console.log("@#$@$@#@#@$#", location.showBookButtonProp.showBookButton);
    // GJ: via the use of useLocation, we will disable the Book button if a user has come from the Walker History | Completed Historical Walks links....
    var showButtonBook = true;
    if (location.showBookButtonProp.showBookButton === false) {
        showButtonBook = false;
    } else {
        showButtonBook = true;
    }

    return (
        <>
            <div className="listings-deatail-container">
                <div className="listing-detail-top-container">
                    {user.type === "W" ? (
                        <div className="listing-detail-doginfo-container">
                            {data.dogInfo ? (
                                <DogInfoCard dog={data.dogInfo} />
                            ) : (
                                <h1>dog info empty</h1>
                            )}
                        </div>
                    ) : (
                        <div className="listing-detail-walkerinfo-container">
                            {data.walkerInfo ? (
                                <WalkerInfoCard walker={data.walkerInfo} />
                            ) : (
                                <h1>Job Unassigned</h1>
                            )}
                        </div>
                    )}
                </div>

                <div className="listing-detail-bottom-container">
                    <div className="listing-detail-jobinfo-container">
                        {data.jobInfo ? (
                            <JobInfoCard
                                job={data.jobInfo}
                                type={user.type}
                                handleSubmit={handleSubmit}
                                showButtonBook={showButtonBook}
                            />
                        ) : (
                            <h1>booking empty</h1>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListingsDetailContent;

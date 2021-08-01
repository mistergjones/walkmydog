import React, { useEffect, useState } from "react";
import "./NewListingsContent.css";
import JobScroll from "../Components/Jobs/JobScroll";
import Chart from "../Components/History/Chart";
import useApi from "../hooks/useApi";
import bookingsApi from "../../src/api/bookings";

const NewListingsContent = () => {
    const { data: bookings, error, loading, request: getBookings } = useApi(
        bookingsApi.getBookings
    );

    useEffect(() => {
        getBookings();
        return () => {
            console.log("What is this");
        };
    }, []);

    return (
        <div className="new-listing-container">
            {error ? (
                <h1>"error"</h1>
            ) : loading ? (
                <h1>Loading</h1>
            ) : (
                <div className="flex-container">
                    {<JobScroll data={bookings} />}
                    {/* <Chart /> */}
                </div>
            )}
        </div>
    );
};

export default NewListingsContent;

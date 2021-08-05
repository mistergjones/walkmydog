import React, { useEffect } from "react";
import "./NewListingsContent.css";
import JobScroll from "../Components/Jobs/JobScroll";
import useApi from "../hooks/useApi";
import bookingsApi from "../api/bookings";

const NewListingsContent = () => {
    const { data: bookings, request: getBookings } = useApi(
        bookingsApi.getBookings
    );

    const loadData = async () => {
        await getBookings();
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="new-listing-container">
            <div className="flex-container">
                <JobScroll data={bookings} />
            </div>

        </div>
    );
};

export default NewListingsContent;

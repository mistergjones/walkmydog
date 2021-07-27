import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./HomeContent.css";
import useApi from '../hooks/useApi';
import bookingsApi from "../api/bookings";

function HomeContent(props) {
    const [bookingId, setBookingId] = useState(useLocation().pathname.substr(1, 3));
    const { data: bookings, error, loading, request: getBooking } = useApi(() => bookingsApi.getBooking(bookingId));

    useEffect(() => {
        getBooking(bookingId);
        return () => {
            console.log("What is this");
        };
    }, []);

    return (
        <div className="new-listing-container">
            {error ? <h1>"error"</h1> : loading ? <h1>Loading</h1> :
                <div className="flex-container">
                    {bookings.map((booking, index) => <h1 key={index}>{booking.start_time}</h1>)}
                </div>}
        </div>
    );
}
export default HomeContent;

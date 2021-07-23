import React, { useEffect, useState } from "react";
import "./NewListings.css";
import JobScroll from "../Components/Jobs/JobScroll";
import axios from "axios";
import Chart from "../Components/History/Chart";

const NewListings = () => {
    const [bookings, setBookings] = useState([]);

    const requestData = async () => {
        const bookingsData = await axios.get(
            "http://localhost:3000/api/bookings"
        );

        // console.log("Bookings data:", bookingsData.data.bookings[0]);
        setBookings(bookingsData.data.bookings);
    };

    useEffect(() => {
        requestData();

        return () => {
            console.log("What is this");
        };
    }, []);

    return (
        <div className="new-listing-container">
            <div className="flex-container">
                <JobScroll data={bookings} />
                <Chart />
            </div>
        </div>
    );
};

export default NewListings;

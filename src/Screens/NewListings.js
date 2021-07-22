import React, { useEffect, useState } from "react";
import Header from "../Components/MainHeader/MainHeader";
import "./NewListings.css";
import JobScroll from "../Components/Jobs/JobScroll";
import axios from "axios";

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
        <>
            <Header />
            <h1>New Listings</h1>
            <JobScroll data={bookings} />
        </>
    );
};

export default NewListings;

import React, { useEffect, useState, useContext } from "react";
import "./NewListingsContent.css";
import JobScroll from "../Components/Jobs/JobScroll";
import useApi from "../hooks/useApi";
import bookingsApi from "../api/bookings";
import walkersApi from "../api/walker";
import { convertDateTime } from "../Helpers/convertDateTime";
import AuthContext from "../context/authContext";

const NewListingsContent = () => {
    const [formattedBookings, setFormattedBookings] = useState(null);
    const [walkerPreferences, setWalkerPreferences] = useState(null);
    const { request: getBookings } = useApi(bookingsApi.getBookings);
    const { user, setUser } = useContext(AuthContext);
    const { request: getWalkerPreferences } = useApi(
        walkersApi.getWalkerPreferences
    );

    const loadData = async () => {
        const tempBookings = await getBookings();

        // GJ 12/10: to prevent historical or jobs within 30 minutes of now being shown to the walker to book....need to check to make sure these are not in the array before displaying to the user

        // get current time in milliseconds. Establish empty array
        const currentTime = new Date().getTime();
        var finalisedBookings = [];
        const thirtyMinutesInMilliSeconds = 1800000;

        // push item to array if booking array start time is > 30 Minutes from now.
        // Only then will these open bookings will be shown to the walker
        for (var i = 0; i < tempBookings.data.length; i++) {
            if (
                tempBookings.data[i].start_time >
                currentTime + thirtyMinutesInMilliSeconds
            ) {
                finalisedBookings.push(tempBookings.data[i]);
            }
        }

        setFormattedBookings(convertDateTime(finalisedBookings));
        if (user.type === "W") {
            const preferences = await getWalkerPreferences(user.id);
            setWalkerPreferences(preferences.data);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="new-listing-container">
            <div className="flex-container">
                {formattedBookings && walkerPreferences ? (
                    <JobScroll
                        data={formattedBookings}
                        preferences={walkerPreferences}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default NewListingsContent;

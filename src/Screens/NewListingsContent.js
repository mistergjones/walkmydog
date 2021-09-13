import React, { useEffect, useState, useContext } from "react";
import "./NewListingsContent.css";
import JobScroll from "../Components/Jobs/JobScroll";
import useApi from "../hooks/useApi";
import bookingsApi from "../api/bookings";
import walkersApi from "../api/walker";
import { convertDateTime } from '../Helpers/convertDateTime';
import AuthContext from '../context/authContext';


const NewListingsContent = () => {
    const [formattedBookings, setFormattedBookings] = useState(null)
    const [walkerPreferences, setWalkerPreferences] = useState(null)
    const { request: getBookings } = useApi(
        bookingsApi.getBookings
    );
    const { user, setUser } = useContext(AuthContext);
    const { request: getWalkerPreferences } = useApi(walkersApi.getWalkerPreferences);

    const loadData = async () => {
        const bookings = await getBookings();
        setFormattedBookings(convertDateTime(bookings.data));
        const preferences = await getWalkerPreferences(user.id);
        setWalkerPreferences(preferences.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="new-listing-container">
            <div className="flex-container">

                {formattedBookings && walkerPreferences ?
                    <JobScroll
                        data={formattedBookings}
                        preferences={walkerPreferences}
                    /> : null
                }
            </div>

        </div>
    );
};

export default NewListingsContent;

import React, { useEffect, useState } from "react";
import "./JobScroll.css";
import convertDateTime from "../../Helpers/convertDateTime";

const JobScroll = ({ data }) => {
    const [finalisedData, setFormattedData] = useState([]);

    useEffect(() => {
        setFormattedData(convertDateTime(data));
    }, [data]);

    return (
        <div className="job-scroll-container">
            <ul>
                {finalisedData.map((booking, idx) => (
                    <div className="job-scroll-list-container" key={idx}>
                        <p>{booking.date}</p>
                        <p>{booking.start_time}</p>
                        <p>{booking.town}</p>
                        <p>{booking.service_type}</p>
                        <p>{booking.dog_firstname}</p>
                        <p>{booking.service_fee}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default JobScroll;

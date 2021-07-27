import React, { useEffect, useState } from "react";
import "./JobScroll.css";
import convertDateTime from "../../Helpers/convertDateTime";
import { NavLink } from "react-router-dom";

const JobScroll = ({ data }) => {
    const [finalisedData, setFormattedData] = useState([]);

    useEffect(() => {
        setFormattedData(convertDateTime(data));
    }, [data]);

    return (
        <div className="job-scroll-container">
            <table className="tbl tbl--block">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Suburb</th>
                        <th>Service</th>
                        <th>Dog Name</th>
                        <th>Service Fee</th>

                    </tr>
                </thead>
                <tbody className="listings-table-data">
                    {finalisedData.map((booking, idx) => (

                        <tr key={idx}>
                            <td> <a href={`/${booking.booking_id}`}>{booking.date}</a></td>
                            <td><a href={`/${booking.booking_id}`}>{booking.start_time}</a></td>
                            <td><a href={`/${booking.booking_id}`}>{booking.town}</a></td>
                            <td><a href={`/${booking.booking_id}`}>{booking.service_type}</a></td>
                            <td><a href={`/${booking.booking_id}`}>{booking.dog_firstname}</a></td>
                            <td><a href={`/${booking.booking_id}`}>${booking.service_fee}</a></td>
                        </tr>

                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default JobScroll;

import React, { useState, useEffect } from "react";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";
import { convertDateTime } from "../../Helpers/convertDateTime";

function ListingsTable({ data }) {
    const [finalisedData, setFinalisedData] = useState([]);
    const [hasDataToShow, setHasDataToShow] = useState(false);

    useEffect(() => {
        if (data.length > 0) {
            setFinalisedData(convertDateTime(data));
            setHasDataToShow(true);
        }
    }, [data]);
    const { LISTINGS_DETAIL } = routes;

    if (hasDataToShow === true) {
        return (
            <table className="tbl tbl--block">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        {/* <th>Suburb</th> */}
                        {/* <th>Status</th> */}
                        <th>Service</th>
                        <th>Dog Name</th>
                        <th>Service Fee</th>
                    </tr>
                </thead>
                <tbody className="listings-table-data">
                    {finalisedData.map((booking, idx) => (
                        <tr key={idx}>
                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: false,
                                        },
                                    }}
                                >
                                    {booking.date}
                                </NavLink>
                            </td>
                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: false,
                                        },
                                    }}
                                >
                                    {booking.start_time}
                                </NavLink>
                            </td>
                            {/* <td>
                                <NavLink
                                    to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                >
                                    {booking.booking_status}
                                </NavLink>
                            </td> */}
                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: false,
                                        },
                                    }}
                                >
                                    {booking.service_type}
                                </NavLink>
                            </td>
                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: false,
                                        },
                                    }}
                                >
                                    {booking.dog_firstname}
                                </NavLink>
                            </td>
                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: false,
                                        },
                                    }}
                                >
                                    ${booking.service_fee}
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } else {
        return (
            <h3 style={{ color: "white" }}>
                You haven't completed any walks yet
            </h3>
        );
    }
}

export default ListingsTable;

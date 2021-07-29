import React from 'react';
import routes from "../../routes/routes";

function ListingsTable({ data }) {
    const { LISTINGS_DETAIL } = routes;
    return <table className="tbl tbl--block">
        <thead>
            <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>Suburb</th>
                <th>Service</th>
                {/* <th>Dog Name</th> */}
                <th>Service Fee</th>

            </tr>
        </thead>
        <tbody className="listings-table-data">
            {data.map((booking, idx) => (

                <tr key={idx}>
                    <td> <a href={`${LISTINGS_DETAIL}${booking.booking_id}`}>{booking.date}</a></td>
                    <td><a href={`${LISTINGS_DETAIL}${booking.booking_id}`}>{booking.start_time}</a></td>
                    <td><a href={`${LISTINGS_DETAIL}${booking.booking_id}`}>{booking.suburb}</a></td>
                    <td><a href={`${LISTINGS_DETAIL}${booking.booking_id}`}>{booking.service_type}</a></td>
                    {/* <td><a href={`${LISTINGS_DETAIL}${booking.booking_id}`}>{booking.dog_firstname}</a></td> */}
                    <td><a href={`${LISTINGS_DETAIL}${booking.booking_id}`}>${booking.service_fee}</a></td>
                </tr>

            ))}
        </tbody>

    </table>
}

export default ListingsTable;
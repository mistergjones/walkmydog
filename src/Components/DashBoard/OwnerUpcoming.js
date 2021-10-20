import React from "react";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";
import "./Upcoming.css";
import Helpers from "../../Helpers/convertDateTime";

// GJ: 15/09:this function receives data from its parent (WalkerDashboardContent) to props
// GJ: it will also pass back the "value" representing the booking_id that will be used
// to delete a booking if need be.
function OwnerUpcoming({ data, handleCancel }) {
    // set the route for the Upcoming services to click on the row itself
    const { LISTINGS_DETAIL } = routes;

    return (
        <div className="upcoming-container">
            <table className="tbl tbl--block fixed_header">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Service</th>
                        <th>Walker</th>
                        <th></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="listings-table-data">
                    {data.assignedJobs.map((assignedWalkItem, index) => (
                        <tr key={index}>
                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: true,
                                        },
                                    }}
                                >
                                    {Helpers.formatAusDate(
                                        assignedWalkItem.date
                                    )}
                                </NavLink>
                            </td>

                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: true,
                                        },
                                    }}
                                >
                                    {Helpers.formatTime12Hour(
                                        assignedWalkItem.start_time
                                    )}
                                </NavLink>
                            </td>

                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: true,
                                        },
                                    }}
                                >
                                    {assignedWalkItem.service_type}
                                </NavLink>
                            </td>

                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: true,
                                        },
                                    }}
                                >
                                    {assignedWalkItem.firstname +
                                        " " +
                                        assignedWalkItem.lastname}
                                </NavLink>
                            </td>

                            <td></td>
                            <td>
                                <button
                                    onClick={handleCancel}
                                    value={assignedWalkItem.booking_id}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}

                    {data.openJobs.map((openWalkItem, index) => (
                        <tr key={index}>
                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${openWalkItem.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${openWalkItem.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: true,
                                        },
                                    }}
                                >
                                    {Helpers.formatAusDate(openWalkItem.date)}
                                </NavLink>
                            </td>

                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${openWalkItem.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${openWalkItem.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: true,
                                        },
                                    }}
                                >
                                    {Helpers.formatTime12Hour(
                                        openWalkItem.start_time
                                    )}
                                </NavLink>
                            </td>

                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${openWalkItem.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${openWalkItem.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: true,
                                        },
                                    }}
                                >
                                    {openWalkItem.service_type}
                                </NavLink>
                            </td>

                            <td>
                                <NavLink
                                    // to={`${LISTINGS_DETAIL}${openWalkItem.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${openWalkItem.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: true,
                                        },
                                    }}
                                >
                                    Un-assigned
                                </NavLink>
                            </td>

                            <td></td>
                            <td>
                                <button
                                    onClick={handleCancel}
                                    value={openWalkItem.booking_id}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OwnerUpcoming;

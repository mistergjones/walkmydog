import React from "react";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";
import "./Upcoming.css";
import Helpers from "../../Helpers/convertDateTime";

// GJ: 15/09:this function receives data from its parent (WalkerDashboardContent) to props
// GJ: it will also pass back the "value" representing the booking_id that will be used
// to delete a booking if need be.
function Upcoming({ data, handleCancel, handleCompletion }) {
    // set the route for the Upcoming services to click on the row itself
    const { LISTINGS_DETAIL } = routes;
    // obtain the current tiem in milleseconds.
    // Will be used to determine if a job start time + duration is less than now. If so, the job can get completed. Future Dated jobs cannot be completed
    const currentTimeMilliseconds = new Date().getTime();

    // Used to cannot cancel within 4 hours
    const FourHoursInMilliseconds = 14400;

    return (
        <div className="upcoming-container">
            <table className="tbl tbl--block fixed_header">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Service</th>
                        <th>Suburb</th>
                        <th>Cancel?</th>
                        <th>Completed?</th>
                    </tr>
                </thead>
                <tbody className="listings-table-data">
                    {data.map((assignedWalkItem, index) => (
                        <tr key={index}>
                            <td>
                                <NavLink
                                    to={`${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`}
                                >
                                    {Helpers.formatAusDate(
                                        assignedWalkItem.date
                                    )}
                                </NavLink>
                            </td>
                            <td>
                                <NavLink
                                    to={`${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`}
                                >
                                    {Helpers.formatTime12Hour(
                                        assignedWalkItem.start_time
                                    )}
                                </NavLink>
                            </td>
                            <td>
                                <NavLink
                                    to={`${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`}
                                >
                                    {assignedWalkItem.service_type}
                                </NavLink>
                            </td>
                            <td>
                                <NavLink
                                    to={`${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`}
                                >
                                    {assignedWalkItem.suburb}
                                </NavLink>
                            </td>
                            {currentTimeMilliseconds >
                            parseInt(assignedWalkItem.start_time) -
                                FourHoursInMilliseconds ? (
                                <td>
                                    {/* <button
                                        onClick={handleCancel}
                                        value={assignedWalkItem.booking_id}
                                    >
                                        No Can
                                    </button> */}
                                </td>
                            ) : (
                                <td>
                                    <button
                                        style={{
                                            color: "black",
                                            backgroundColor: "lightgreen",
                                        }}
                                        onClick={handleCancel}
                                        value={assignedWalkItem.booking_id}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            )}
                            {currentTimeMilliseconds >
                            parseInt(assignedWalkItem.start_time) +
                                assignedWalkItem.duration ? (
                                <td>
                                    <button
                                        style={{
                                            color: "black",
                                            backgroundColor: "lightgreen",
                                        }}
                                        onClick={handleCompletion}
                                        value={assignedWalkItem.booking_id}
                                    >
                                        Yes
                                    </button>
                                </td>
                            ) : (
                                <td>
                                    <button
                                        style={{
                                            color: "black",
                                            backgroundColor: "lightgray",
                                        }}
                                    >
                                        Scheduled
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Upcoming;

import React from "react";
import routes from "../../routes/routes";
import { Navlilnk } from "react-router-dom";
import "./Upcoming.css";
import Helpers from "../../Helpers/convertDateTime";

// GJ: 15/09:this function receives data from its parent (WalkerDashboardContent) to props
function Upcoming({ data, handleClick }) {
    // set the route for teh "MORE" button. WHERE DOES IT GO???
    // const { ???? } = routes;

    return (
        <div className="upcoming-container">
            <table className="tbl tbl--block fixed_header">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Service</th>
                        <th>Suburb</th>
                        <th></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((assignedWalkItem, index) => (
                        <tr key={index}>
                            <td>
                                {Helpers.formatAusDate(assignedWalkItem.date)}
                            </td>
                            <td>
                                {Helpers.formatTime12Hour(
                                    assignedWalkItem.start_time
                                )}
                            </td>
                            <td>{assignedWalkItem.service_type}</td>
                            <td>{assignedWalkItem.suburb}</td>
                            <td></td>
                            <td>
                                <button onClick={handleClick}>Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Upcoming;

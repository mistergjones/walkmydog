import React from "react";
import routes from "../../routes/routes";
//import { NavLink } from "react-router-dom";
import "./History.css";

import Helpers from "../../Helpers/convertDateTime";

// GJ: 15/09: this function receives data from its parent (WalkerDashboardContent) to props
function OwnerHistory(props) {
    //const { HISTORY } = routes;
    // console.log("OWNER HISTORY", props.data);

    const handlePayment = (e) => {
        e.preventDefault();
    };

    return (
        <div className="history-container">
            <table className="tbl tbl--block fixed_header">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Service</th>
                        <th>Service Fee</th>
                        <th>Walker Name</th>
                        <th>Map Route</th>
                        <th>Pay Walker</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((historialRowItem, index) => (
                        <tr key={index}>
                            <td>
                                {Helpers.formatAusDate(historialRowItem.date)}
                            </td>
                            <td>
                                {Helpers.formatTime12Hour(
                                    historialRowItem.start_time
                                )}
                            </td>
                            <td>{historialRowItem.service_type}</td>
                            <td>{historialRowItem.service_fee}</td>
                            <td>
                                {historialRowItem.firstname +
                                    " " +
                                    historialRowItem.lastname}
                            </td>
                            <td>
                                <button>View</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handlePayment}>
                                    Pay
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OwnerHistory;

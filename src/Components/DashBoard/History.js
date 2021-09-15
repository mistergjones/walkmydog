import React from "react";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";
import "./History.css";

import Helpers from "../../Helpers/convertDateTime";

// GJ: 15/09: this function receives data from its parent (WalkerDashboardContent) to props
function History(props) {
    const { HISTORY } = routes;

    return (
        <div className="history-container">
            <table className="tbl tbl--block fixed_header">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Service</th>
                        <th>Dog Name</th>
                        <th>Service Fee</th>

                        <th>
                            <NavLink to={`${HISTORY}`}>
                                <button>History</button>
                            </NavLink>
                        </th>
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
                            <td>{historialRowItem.dog_firstname}</td>
                            <td>${historialRowItem.service_fee}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default History;

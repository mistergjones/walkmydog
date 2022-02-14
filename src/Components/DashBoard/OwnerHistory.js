import React, { useState, useContext } from "react";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";
import "./History.css";

import AuthContext from "../../context/authContext";
import useApi from "../../hooks/useApi";
import ownersApi from "../../api/owners";

import Helpers from "../../Helpers/convertDateTime";

// GJ: 15/09: this function receives data from its parent (WalkerDashboardContent) to props
function OwnerHistory(props) {
    //const { HISTORY } = routes;
    // console.log("OWNER HISTORY", props.data);
    const { setUser, user } = useContext(AuthContext);
    const { request: ownermakespayment } = useApi(ownersApi.ownerMakesPayment);

    // 12/02/2022 - need to generate STRIPE payment for owner to pay walker
    const handlePayment = async (e) => {
        e.preventDefault();
        const stripeCheckoutSession = await ownermakespayment();

        console.log("The FRONTEND route is", stripeCheckoutSession);

        try {
            window.open(stripeCheckoutSession.data.url, "_blank");
        } catch (error) {}
    };

    const viewMap = (e) => {
        // just open the IMAGE in a new TAB. Nothing secret about it.
        var urlToOpen = e.target.value;
        window.open(urlToOpen, "_blank");
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
                                <button
                                    value={
                                        historialRowItem.walk_completed_proof
                                    }
                                    onClick={viewMap}
                                >
                                    View
                                </button>
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

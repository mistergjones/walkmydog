import React from "react";
import "./NewListings.css";

function NewListings(props) {
    return (
        <div className="newlistings-container">
            <table className="tbl tbl--block">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Service</th>
                        <th>Suburb</th>
                        <th></th>
                        <th>Action</th>
                        <th>Other</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>15/09/2021</td>
                        <td>9:00 am</td>
                        <td>30 Min Walk</td>
                        <td>Melbourne</td>
                        <td></td>
                        <td>
                            <button>Book</button>
                        </td>

                        <td>
                            <button>More Info</button>
                        </td>
                    </tr>
                    <tr>
                        <td>15/09/2021</td>
                        <td>9:00 am</td>
                        <td>30 Min Walk</td>
                        <td>Melbourne</td>
                        <td></td>
                        <td>
                            <button>Book</button>
                        </td>

                        <td>
                            <button>More Info</button>
                        </td>
                    </tr>
                    <tr>
                        <td>15/09/2021</td>
                        <td>9:00 am</td>
                        <td>30 Min Walk</td>
                        <td>Melbourne</td>
                        <td></td>
                        <td>
                            <button>Book</button>
                        </td>

                        <td>
                            <button>More Info</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default NewListings;

import React, { useState, useEffect } from "react";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";
import "./Upcoming.css";
import Helpers from "../../Helpers/convertDateTime";
import ConfirmationModal from "../UI/Modal/ConfirmationModal";

// GJ: 15/09:this function receives data from its parent (WalkerDashboardContent) to props
// GJ: it will also pass back the "value" representing the booking_id that will be used to delete a booking if need be.
function Upcoming({ data, handleCancel, handleCompletion }) {
    const [showModal, setShowModal] = useState(null);

    const [bookingID, setBookingID] = useState(null);
    // GJ: handle to determine to show the modal or not
    const [show, setShow] = useState(null);
    const [widget, setWidget] = useState(null);
    const [error, setError] = useState(null);
    const [walkerURL, setWalkerProofURL] = useState(null);

    // set the route for the Upcoming services to click on the row itself
    const { LISTINGS_DETAIL } = routes;
    // obtain the current tiem in milleseconds.
    // Will be used to determine if a job start time + duration is less than now. If so, the job can get completed. Future Dated jobs cannot be completed
    const currentTimeMilliseconds = new Date().getTime();

    // Used to cannot cancel within 4 hours
    const FourHoursInMilliseconds = 14400;

    // GJ: For some rason, need to follow the same pattern as Peter to make the cloudinaryAPI widget work.

    useEffect(() => {
        setWidget(
            window.cloudinary.createUploadWidget(
                {
                    cloud_name: "dwndlszzc",
                    upload_preset: "s2g31ynm",
                    sources: ["url", "local"],
                    multiple: false,
                },

                function (error, result) {
                    if (!error) {
                        console.log(
                            "Upload Widget event - ",
                            result[0].secure_url
                        );
                        setError(false);
                        setWalkerProofURL(result[0].secure_url);
                        // ensure to show the confirmation modal
                        setShow(true);
                    }
                }
            )
        );
    }, [walkerURL]);

    // GJ: The purpose is to obtain the Booking ID value when a walk is to be completed. It will then show the Confirmation modal for the user to uplaod their proof
    const displayWidgetandConfirmationModal = (buttonBookingIDClickValue) => {
        // open the cloudinary api widget
        widget.open();
        // set a flag to show the confirmation modal
        setShowModal(true);
        setBookingID(buttonBookingIDClickValue.target.value);
    };

    // GJ: the below is used to help handle when a walker wants to cancel a walk that they have booked
    const displayConfirmationModal = (buttonBookingIDClickValue) => {
        // set a flag to show the confirmation modal
        setShow(true); // required for the modal to show. Required for props
        setShowModal(true); // required for conditional rendering
        setBookingID(buttonBookingIDClickValue.target.value);
    };

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
                                    // to={`${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`}
                                    to={{
                                        pathname: `${LISTINGS_DETAIL}${assignedWalkItem.booking_id}`,
                                        showBookButtonProp: {
                                            showBookButton: false,
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
                                            showBookButton: false,
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
                                            showBookButton: false,
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
                                            showBookButton: false,
                                        },
                                    }}
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
                                        style={{
                                            color: "black",
                                            backgroundColor: "lightgreen",
                                        }}
                                    >
                                        Started
                                    </button> */}
                                </td>
                            ) : (
                                // <td>
                                //     <button
                                //         style={{
                                //             color: "black",
                                //             backgroundColor: "orange",
                                //         }}
                                //         onClick={handleCancel}
                                //         value={assignedWalkItem.booking_id}
                                //     >
                                //         Cancel
                                //     </button>
                                // </td>

                                <td>
                                    <button
                                        style={{
                                            color: "black",
                                            backgroundColor: "orange",
                                        }}
                                        type="submit"
                                        onClick={displayConfirmationModal}
                                        value={assignedWalkItem.booking_id}
                                    >
                                        Cancel
                                    </button>
                                    {showModal && (
                                        <ConfirmationModal
                                            onClose={() => setShow(false)}
                                            show={show}
                                            handleSubmit={handleCancel}
                                            value={bookingID}
                                        />
                                    )}
                                </td>
                            )}
                            {currentTimeMilliseconds >
                            parseInt(assignedWalkItem.start_time) +
                                assignedWalkItem.duration ? (
                                <td>
                                    {/* <button
                                        style={{
                                            color: "black",
                                            backgroundColor: "lightgreen",
                                        }}
                                        onClick={handleCompletion}
                                        value={assignedWalkItem.booking_id}
                                    >
                                        Yes
                                    </button> */}
                                    <button
                                        style={{
                                            color: "black",
                                            backgroundColor: "lightgreen",
                                        }}
                                        //onClick={() => setShow(true)}
                                        // onClick={() => widget.open()}
                                        onClick={
                                            displayWidgetandConfirmationModal
                                        }
                                        value={assignedWalkItem.booking_id}
                                    >
                                        Yes
                                    </button>

                                    {showModal && (
                                        <ConfirmationModal
                                            onClose={() => setShow(false)}
                                            show={show}
                                            handleSubmit={handleCompletion}
                                            value={bookingID}
                                            value2={walkerURL}
                                        />
                                    )}
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

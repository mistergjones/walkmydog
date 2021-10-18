import React, { useState } from "react";
import "./JobInfoCard.css";
import {
    formatTime12Hour,
    formatAusDate,
} from "../../../Helpers/convertDateTime";
// GJ: Add modal for a prompt to confirm a booking
import ConfirmationModal from "../Modal/ConfirmationModal.js";

function JobInfoCard({ job, type, handleSubmit }) {
    // GJ: handle to determine to show the modal or not
    const [show, setShow] = useState(null);
    return (
        <>
            <div className="jobinfo-container mx-auto">
                {type && (
                    <div className="left-side">
                        <div className="title">
                            <div>Job Details</div>
                        </div>
                    </div>
                )}
                <div className="center-side">
                    <div className="field">
                        <div className="field-heading">Date</div>
                        <p>{formatAusDate(job.date)}</p>
                    </div>
                    <div className="field">
                        <div className="field-heading">Start Time</div>
                        <p>{formatTime12Hour(job.startTime)}</p>
                    </div>
                    {job.endTime && (
                        <div className="field">
                            <div className="field-heading">End Time</div>
                            <p>{formatTime12Hour(job.endTime)}</p>
                        </div>
                    )}
                    <div className="field">
                        <div className="field-heading">Suburb</div>
                        <p>{job.suburb}</p>
                    </div>
                    <div className="field">
                        <div className="field-heading">Service</div>
                        <p>{job.serviceType}</p>
                    </div>
                    <div className="field">
                        <div className="field-heading">Cost</div>
                        <p>${job.serviceFee}</p>
                    </div>
                </div>

                {type && (
                    <div className="right-side jobinfo-button-container">
                        {/* <button
                            name="submitBooking"
                            className={"btn btn-mt-3 btn-light"}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {type === "O" ? "CANCEL" : "BOOK"}
                        </button> */}
                        <button
                            name="submitBooking"
                            className={"btn btn-mt-3 btn-light"}
                            type="submit"
                            onClick={() => setShow(true)}
                        >
                            {type === "O" ? "CANCEL" : "BOOK"}
                        </button>
                        <ConfirmationModal
                            onClose={() => setShow(false)}
                            show={show}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default JobInfoCard;

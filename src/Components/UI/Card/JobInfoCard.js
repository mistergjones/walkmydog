import React from 'react';
import "./JobInfoCard.css"
import { formatTime12Hour, formatAusDate } from '../../../Helpers/convertDateTime';




function JobInfoCard({ job, type, handleSubmit }) {
    return (
        <>
            <div className="jobinfo-container mx-auto">
                {type && <div className="left-side">
                    <div className="title">
                        <div>Job Details</div>

                    </div>
                </div>
                }
                <div className="center-side">
                    <div className="field">
                        <div className="field-heading">Date</div>
                        <p>{formatAusDate(job.date)}</p>
                    </div>
                    <div className="field">
                        <div className="field-heading">Start Time</div>
                        <p>{formatTime12Hour(job.startTime)}</p>
                    </div>
                    {job.endTime &&
                        <div className="field">
                            <div className="field-heading">End Time</div>
                            <p>{formatTime12Hour(job.endTime)}</p>
                        </div>
                    }
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
                {type &&
                    <div className="right-side jobinfo-button-container">
                        <button
                            className={"btn btn-mt-3 btn-light"}
                            type="submit"
                            onClick={handleSubmit}> {type === "O" ? "CANCEL" : "BOOK"}</button>
                    </div>
                }
            </div>
        </>
    );
}

export default JobInfoCard;
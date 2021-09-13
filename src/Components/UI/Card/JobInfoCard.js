import React from 'react';
import "./JobInfoCard.css"
import { formatTime12Hour, formatAusDate } from '../../../Helpers/convertDateTime';



function JobInfoCard({ job, type }) {
    return (
        <>
            <div data-aos="flip-right" className="jobinfo-container">
                <div className="left-side">
                    <div className="title">
                        <div>Job Details</div>

                    </div>
                </div>
                <div className="center-side">
                    <div className="field">
                        <div className="field-heading">Date</div>
                        <p>{formatAusDate(job.date)}</p>
                    </div>
                    <div className="field">
                        <div className="field-heading">Time</div>
                        <p>{formatTime12Hour(job.startTime)}</p>
                    </div>
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
                <div className="right-side jobinfo-button-container">
                    <button
                        className={"btn btn-mt-3 btn-light"}
                        type="submit" >{type === "O" ? "CANCEL" : "BOOK"}</button>
                </div>
            </div>
        </>
    );
}

export default JobInfoCard;
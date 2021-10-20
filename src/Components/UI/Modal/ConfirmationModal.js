import React, { useState, useEffect } from "react";
import "./ConfirmationModal.css";

// This modal actually receives a function from its parent and we also provide arguments to it so it can process data.
const ConfirmationModal = (props) => {
    // create a data object that contains booking_id and the URL of the walk map
    const bookingIdWalkerProofDataObj = {};

    bookingIdWalkerProofDataObj.booking_id = props.value;
    bookingIdWalkerProofDataObj.walk_proof = props.value2;

    if (!props.show) {
        return null;
    } else {
        return (
            <div className="modalBox">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title">Are you sure?</h1>
                    </div>

                    <div className="modal-body"></div>

                    <div className="modal-footer">
                        <button onClick={props.onClose} className="button">
                            Back
                        </button>
                        <button
                            onClick={() =>
                                props.handleSubmit(bookingIdWalkerProofDataObj)
                            }
                            //value={props.value}
                            value={bookingIdWalkerProofDataObj}
                            className="button"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};
export default ConfirmationModal;

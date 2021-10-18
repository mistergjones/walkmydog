import React, { useState, useEffect } from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = (props) => {
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
                            onClick={props.handleSubmit}
                            value={props.value}
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

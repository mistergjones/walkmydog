/**
 * This component is aimed at delivering a consisten error message
 * display througout the app
 */

import React from 'react';
import "./ErrorMessageDisplay.css"

function ErrorMessageDisplay({ message }) {
    return (
        <div className="message-container">
            <h1>We have an error</h1>
            <h2>Message</h2> <p> {message}</p>
        </div>
    );
}

export default ErrorMessageDisplay;
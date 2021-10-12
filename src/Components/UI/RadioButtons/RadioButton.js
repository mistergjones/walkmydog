import React from "react";
import { ErrorMessage, useField } from "formik";
import "./RadioButton.css";
const RadioButton = (props) => {
    return (
        <div className="radio-button-container">
            <label className="radio-button-label-text" htmlFor={props.id}>
                <input
                    name={props.name}
                    id={props.id}
                    type="radio"
                    value={props.value}
                    onChange={props.onChange}
                    {...props}
                    className="button-color"
                />
                {props.label}
            </label>
            {/* <ErrorMessage component="p" name={props.name} className="error" /> */}
        </div>
    );
};

export default RadioButton;

import React from "react";
// import { ErrorMessage, useField } from "formik";

const RadioButton = (props) => {
    return (
        <div>
            <label htmlFor={props.id}>{props.label}:</label>
            <input
                name={props.name}
                id={props.id}
                type="radio"
                value={props.value}
                onChange={props.onChange}
                {...props}
            />

            {/* <ErrorMessage component="div" name={props.name} className="error" /> */}
        </div>
    );
};

export default RadioButton;

import React from "react";
import { Field, ErrorMessage, useField } from "formik";

function CheckBox(props) {
    return (
        <div>
            <input
                type="checkbox"
                id={props.name}
                name={props.name}
                onChange={(e) => {
                    props.form.setFieldValue(props.name, e.target.checked);
                }}
            />
            <label htmlFor={props.name}> {props.label}</label>
            <ErrorMessage
                component="div"
                className="input-error"
                name="checkbox"
            />
        </div>
    );
}

export default CheckBox;

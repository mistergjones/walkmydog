import React from 'react';
import { ErrorMessage, useField } from "formik";

function TeaxtArea({ label, ...props }) {
    const [field, meta, helpers] = useField(props);
    return (
        <div className="text-field-container">
            <label className="label-text" htmlFor={field.name}>{label}</label>

            <textarea
                className="form-control"
                {...field}
                {...props}>

            </textarea>
        </div>
    );
}

export default TeaxtArea;
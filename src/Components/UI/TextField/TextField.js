import React from "react";
import "./TextField.css";
import { ErrorMessage, useField } from "formik";

function TextField({ label, ...props }) {
    // fields are the name fields. e.g. field.name
    // meta contains the values and in-build function calls
    const [field, meta] = useField(props);
    // console.log("Field is: ", field);
    // console.log("Meta is: ", meta);
    // console.log("Props are: ", props);
    return (
        <div className="mb-2">
            <label htmlFor={field.name}>{label}</label>

            <input
                className={`form-control shadow-none ${
                    meta.touched && meta.error && "is-invalid"
                }`}
                {...field}
                {...props}
                autoComplete="off"
            />
            {/* So if there is an actual error, need to show the Formik Error Message */}
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    );
}
export default TextField;

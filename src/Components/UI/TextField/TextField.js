import React from "react";
import "./TextField.css";
//useField is a custom React hook that will automagically help you hook up inputs to Formik
import { ErrorMessage, useField } from "formik";

function TextField({ label, ...props }) {
    // fields are the name fields. e.g. field.name
    // meta contains the values and in-build function calls
    const [field, meta, helpers] = useField(props);
    // console.log("Field is: ", field);
    // console.log("Meta is: ", meta);
    // console.log("Props are: ", props);
    // console.log("Helpers are:", helpers);
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
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    );
}
export default TextField;

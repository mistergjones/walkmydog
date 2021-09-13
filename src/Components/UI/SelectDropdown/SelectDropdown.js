import React from 'react';
import { ErrorMessage, useField } from "formik";

function SelectDropdown({ label, ...props }) {

    const [field, meta, helpers] = useField(props);
    return (
        <div className="text-field-container">
            <label className="label-text" htmlFor={field.name}>{label}</label>
            <select

                className={`form-select shadow-none ${meta.touched && meta.error && "is-invalid"
                    }`}
                {...field}
                {...props}
                autoComplete="off"

            />
            <ErrorMessage component="p" name={field.name} className="error" />
        </div>
    );
}

export default SelectDropdown;
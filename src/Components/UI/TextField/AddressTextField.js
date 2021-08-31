import React, { useEffect } from 'react';
import { ErrorMessage, useField } from 'formik';

const AddressTextField = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);


    useEffect(() => {
        if (props.address) {
            helpers.setValue(props.address);

        }
    }, [props.address])

    return (
        <div className="text-field-container">
            <label className="label-text" htmlFor={field.name}>{label}</label>
            <input
                className={`form-control shadow-none ${meta.touched && meta.error && "is-invalid"
                    }`}
                {...field}
                {...props}
                autoComplete="off"
                onKeyPress={e => e.code === "Enter" ? e.preventDefault() : ""}
            />

            <ErrorMessage component="p" name={field.name} className="error" />
        </div>
    );
};

export default AddressTextField;
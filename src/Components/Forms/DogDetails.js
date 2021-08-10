import React from "react";
import TextField from "../UI/TextField/TextField";

import { Formik, Form } from "formik";
import * as Yup from "yup";

function DogDetails(props) {
    return (
        <Formik
            initialValues={{
                breed: "",
                dogname: "",
                dogage: "",
                requiresLeash: false,
            }}
            // validate the input fields to the schema above
            // validationSchema={validate}
            onSubmit={(values) => console.log(values)}
        >
            <div>
                <h3>Dog Details Here</h3>
                <TextField
                    label="Breed"
                    name="breed"
                    type="text"
                    placeholder="Breed"
                />
                <TextField
                    label="Dog Name"
                    name="dogname"
                    type="text"
                    placeholder="Dog Name"
                />
                <TextField
                    label="Dog Age"
                    name="dogage"
                    type="text"
                    placeholder="Dog Age"
                />
                <label htmlFor="requiresLeash">
                    <input
                        type="checkbox"
                        name="requiresLeash"
                        id="requiresLeash"
                    />
                    Reqires Leash
                </label>
            </div>
        </Formik>
    );
}

export default DogDetails;

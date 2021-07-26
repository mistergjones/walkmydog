import React from "react";
import TextField from "../UI/TextField/TextField";

import { Formik, Form } from "formik";
import * as Yup from "yup";

function LoginForm(props) {
    // establish Yup to error check the submitted values in the form fields
    const validate = Yup.object({
        email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
        password: Yup.string()
            .min(3, "You password must be at least 3 character or more")
            .required("Password is required"),
    });

    return (
        // establish a Formik form and set the initial values
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            // call the function to validate the inputed values
            validationSchema={validate}
            // need to do something e.g. check the info from the database
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {(formik) => (
                <div>
                    <h1 className="my-4 font-weight-bold-display-4">Log-in </h1>
                    <Form>
                        <TextField
                            label="Email address"
                            name="email"
                            type="text"
                        />
                        <TextField
                            label="Your Password"
                            name="password"
                            type="password"
                        />
                        <button className="btn btn-dark btn-mt-3" type="submit">
                            Login
                        </button>
                        <button
                            className="btn btn-danger btn-mt-3"
                            type="reset"
                        >
                            Reset
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

export default LoginForm;

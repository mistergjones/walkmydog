import React, { useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import TextField from "../UI/TextField/TextField";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import useApi from "../../Hooks/useApi";
import usersApi from "../../api/glenusers";

const bcrypt = require("bcryptjs");

// This function captures the new user input fields, validates them, hashes the password and inserts in to the database.
function SignUpForm(props) {
    const { request: insertUser } = useApi(usersApi.insertUser);
    const [signupSuccess, setSignUpSuccess] = useState(false);

    // take the form data, hash the clear text password and insert into DB.
    // return TRUE if success and route elsewhere....
    const insertNewUser = async (formData) => {
        // 1. generate a salt/rounding calculation
        var salt = bcrypt.genSaltSync(10);

        // 2. hash the password with the salt
        var hashedPassword = bcrypt.hashSync(formData.password, salt);

        //3. replace the existing clear text password with hashed password
        formData.password = hashedPassword;

        //4. Remove the confirmPassword...it is not needed for the insert
        delete formData.confirmPassword;

        // 5. Insert the data as an object
        const { data: didInsertWork } = await insertUser({
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            hashedPassword: hashedPassword,
        });

        // if there is an error (i.e. return FALSE and don't ROUTE to another screen. ELSE a success and route elsewhere...)
        return didInsertWork.error ? false : true;
    };

    // establish the error checking rules and messages with YUP
    const validate = Yup.object({
        firstName: Yup.string()
            .min(2, "Must be 2 chacters or greater")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        lastName: Yup.string()
            .min(2, "Must be 2 chacters or greater")
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
        password: Yup.string()
            .min(3, "Password must be at least 3 characters or more")
            .required("Password is required"),
        confirmPassword: Yup.string()
            // use oneOf Yup.ref to check if hte above password is the same
            .oneOf([Yup.ref("password"), null], "Password must match")
            .required("Confirm password is required"),
    });

    return (
        <>
            {signupSuccess ? (
                <Redirect to="/newlistings" />
            ) : (
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    // call the function to validate the inputed values
                    validationSchema={validate}
                    // call the below function to insert the user inputted data
                    onSubmit={async (fields) => {
                        let result = await insertNewUser(fields);
                        setSignUpSuccess(result);
                    }}
                >
                    {(formik) => (
                        <div>
                            <h1 className="my-4 font-weight-bold-display-4">
                                Sign Up
                            </h1>
                            {/* print out hte values of the inputted info */}
                            {/* {console.log("The form values are: ", formik.values)} */}
                            <Form>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    type="text"
                                />
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    type="text"
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                />
                                <TextField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                />
                                <button
                                    className="btn btn-dark mt-3"
                                    type="submit"
                                >
                                    Register
                                </button>

                                <button
                                    className="btn btn-danger mt-3 ml-3 "
                                    type="reset"
                                >
                                    Reset
                                </button>
                            </Form>
                        </div>
                    )}
                </Formik>
            )}
        </>
    );
}

export default SignUpForm;

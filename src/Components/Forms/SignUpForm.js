import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import TextField from "../UI/TextField/TextField";
import "./SignUpForm.css";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import useApi from "../../hooks/useApi";
import usersApi from "../../api/glenusers";

import jwtDecode from "jwt-decode";
import AuthContext from "../../context/authContext";
import storageService from "../../storage/localStorage";

// This function captures the new user input fields, validates them, hashes the password and inserts in to the database.
function SignUpForm(props) {
    const { user, setUser } = useContext(AuthContext);
    const { request: insertUser } = useApi(usersApi.insertUser);
    const [signupSuccess, setSignUpSuccess] = useState(false);

    // take the form data, hash the clear text password and insert into DB.
    // return TRUE if success and route elsewhere....
    const insertNewUser = async (formData) => {
        //1. Remove the confirmPassword...it is not needed for the insert
        delete formData.confirmPassword;

        // 2. Insert the data as an object
        const response = await insertUser({
            // NOTE firstname and lastname not required for CREDENTIAL INSERT but required to kickstart either the population of WALKERS or OWNERS table
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            // hashedPassword: hashedPassword,
            password: formData.password,
            type: formData.type,
        });

        console.log("SIGN UP - resonse data: ", response);

        const token = response.headers["x-auth-token"];
        const userToken = jwtDecode(token);
        storageService.setToken(token);
        setUser(userToken);
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
        type: Yup.string().min(1, "asdfdadasdfafa").required("ASDFAFAD"),
    });

    return (
        <>
            {user ? (
                user.hasProfile ? (
                    <Redirect to="/newlistings" />
                ) : (
                    <Redirect to="/profile" />
                )
            ) : (
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        type: "",
                    }}
                    // call the function to validate the inputed values
                    validationSchema={validate}
                    // call the below function to insert the user inputted data
                    onSubmit={async (fields) => {
                        console.log("Fields are:", fields);
                        await insertNewUser(fields);
                        // setSignUpSuccess(result);
                    }}
                >
                    {(formik) => (
                        <div>
                            <h1 className="my-4 font-weight-bold-display-4">
                                Sign Up
                            </h1>
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
                                Dog Walker or Owner?
                                <div className="sign-up-form-radio-buttons">
                                    <label htmlFor="type">
                                        Walker:
                                        <Field
                                            name="type"
                                            value="W"
                                            type="radio"
                                            onClick={formik.handleChange}
                                        />
                                    </label>

                                    <label htmlFor="type">
                                        Dog Owner:
                                        <Field
                                            name="type"
                                            value="O"
                                            type="radio"
                                            onClick={formik.handleChange}
                                        />
                                    </label>
                                </div>
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
                                    className="btn btn-danger mt-3 ms-3 "
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

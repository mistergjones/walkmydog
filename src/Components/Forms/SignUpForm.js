import React, { useContext } from "react";
import "./SignUpForm.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import useApi from "../../hooks/useApi";
import usersApi from "../../api/glenusers";

import AuthContext from "../../context/authContext";
import jwtService from "../../storage/jwt";
import ProfileRedirect from "./ProfileRedirect";

import RadioButton from "../UI/RadioButtons/RadioButton";

// This function captures the new user input fields, validates them, hashes the password and inserts in to the database.
const SignUpForm = (props) => {
    const { setUser } = useContext(AuthContext);
    const { request: insertUser } = useApi(usersApi.insertUser);

    // take the form data, hash the clear text password and insert into DB.
    // return TRUE if success and route elsewhere....
    const insertNewUser = async (formData) => {
        //1. Remove the confirmPassword...it is not needed for the insert
        // delete formData.confirmPassword;
        try {
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
            // GET JWT TOKEN FROM RESPONSE AND DECODE TO USER OBJECT IF NO TOKEN RETURNS NULL;
            setUser(jwtService.getUserFromResponseToken(response));
        } catch (error) {
            console.log("error in submit form", error);
        }
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
        type: Yup.string().required("You must select 1 option"),
    });

    return (
        <>
            <ProfileRedirect />
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
                }}
            >
                {(formik) => (
                    <div>
                        <h1 className="my-4 font-weight-bold-display-4">
                            Sign Up
                        </h1>
                        <Form
                            onSubmit={formik.handleSubmit}
                            className="sign-up-form-layout"
                        >
                            <div>
                                <label htmlFor="firstName">Firstname</label>
                            </div>

                            <Field
                                className="sign-up-form-field-width"
                                name="firstName"
                                type="text"
                            />
                            <ErrorMessage
                                name="firstName"
                                className="error"
                                component="p"
                            />

                            <div>
                                <label htmlFor="lastName">Lastname</label>
                            </div>

                            <Field
                                className="sign-up-form-field-width"
                                name="lastName"
                                type="text"
                            />
                            <ErrorMessage
                                name="lastName"
                                className="error"
                                component="p"
                            />
                            <div>
                                <label htmlFor="email">Email</label>
                            </div>
                            <Field
                                className="sign-up-form-field-width"
                                name="email"
                                type="email"
                            />
                            <ErrorMessage
                                name="email"
                                className="error"
                                component="p"
                            />
                            <div>
                                <label htmlFor="type">
                                    Dog Walker or Owner?
                                </label>
                            </div>
                            <div className="sign-up-form-radio-buttons">
                                <label htmlFor="">
                                    Walker:
                                    <Field type="radio" name="type" value="W" />
                                </label>

                                <label htmlFor="">
                                    Owner:
                                    <Field type="radio" name="type" value="O" />
                                </label>
                            </div>

                            {/* <div className="sign-up-form-radio-buttons">
                                <RadioButton
                                    id="walker"
                                    name="type"
                                    label="Walker"
                                    value="W"
                                    onClick={formik.handleChange}
                                />
                                <RadioButton
                                    id="owner"
                                    name="type"
                                    label="Owner"
                                    value="O"
                                    onClick={formik.handleChange}
                                />
                            </div> */}
                            <ErrorMessage
                                name="type"
                                className="error"
                                component="p"
                            />

                            <div>
                                <label htmlFor="password">Password</label>
                            </div>
                            <Field
                                className="sign-up-form-field-width"
                                name="password"
                                type="password"
                            />
                            <ErrorMessage
                                name="password"
                                className="error"
                                component="p"
                            />
                            <div>
                                <label htmlFor="password">
                                    Confirm Password
                                </label>
                            </div>
                            <Field
                                className="sign-up-form-field-width"
                                name="confirmPassword"
                                type="password"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                className="error"
                                component="p"
                            />
                            <div>
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
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
};

export default SignUpForm;

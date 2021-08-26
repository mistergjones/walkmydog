import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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

    console.log("sign up component");
    // take the form data, hash the clear text password and insert into DB.
    // return TRUE if success and route elsewhere....
    const insertNewUser = async (formData) => {
        //1. Remove the confirmPassword...it is not needed for the insert
        // delete formData.confirmPassword;
        try {
            // 2. Insert the data as an object
            const response = await insertUser({
                // NOTE firstname and lastname not required for CREDENTIAL INSERT but required to kickstart either the population of WALKERS or OWNERS table
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                // hashedPassword: hashedPassword,
                password: formData.password,
                type: formData.type,
            });

            // console.log("SIGN UP - resonse data: ", response);
            // GET JWT TOKEN FROM RESPONSE AND DECODE TO USER OBJECT IF NO TOKEN RETURNS NULL;
            console.log(
                "ASDASFDSADF",
                jwtService.getUserFromResponseToken(response)
            );
            setUser(jwtService.getUserFromResponseToken(response));
        } catch (error) {
            console.log("error in submit form", error);
        }
    };

    // establish the error checking rules and messages with YUP
    const validate = Yup.object({
        firstname: Yup.string()
            .min(2, "Must be 2 chacters or greater")
            .max(15, "Must be 15 characters or less")
            .required("Firstname is Required"),
        lastname: Yup.string()
            .min(2, "Must be 2 chacters or greater")
            .max(20, "Must be 20 characters or less")
            .required("Lastname is Required"),
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
        type: Yup.string().required("You must select Owner or Walker option"),
    });

    return (
        <>
            {console.log("return load")}
            <ProfileRedirect />
            <Formik
                initialValues={{
                    firstname: "",
                    lastname: "",
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
                onReset={() => {
                    console.log("reset");
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
                                name="firstname"
                                type="text"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                            />

                            <ErrorMessage
                                id="errorFirstname"
                                name="firstname"
                                className="error"
                                component="p"
                            />

                            <div>
                                <label htmlFor="lastname">Lastname</label>
                            </div>

                            <Field
                                className="sign-up-form-field-width"
                                name="lastname"
                                type="text"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                            />
                            <ErrorMessage
                                id="errorLastname"
                                name="lastname"
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
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            <ErrorMessage
                                id="errorEmail"
                                name="email"
                                className="error"
                                component="p"
                            />
                            {/* <div>
                                <label htmlFor="">Dog Walker or Owner?</label>
                            </div> */}
                            <div id="my-radio-group">
                                Are you a dog walker or dog owner?
                            </div>
                            <div
                                className="sign-up-form-radio-buttons"
                                role="group"
                                aria-labelledby="my-radio-group"
                            >
                                <Field
                                    id="walker"
                                    type="radio"
                                    name="type"
                                    value="W"
                                    label="Walker"
                                    onChange={formik.handleChange}
                                    selected={
                                        formik.values.type === "W"
                                            ? true
                                            : false
                                    }
                                />
                                <label>Walker</label>

                                <Field
                                    id="owner"
                                    type="radio"
                                    name="type"
                                    value="O"
                                    label="Owner"
                                    onChange={formik.handleChange}
                                    selected={
                                        formik.values.type === "O"
                                            ? true
                                            : false
                                    }
                                />
                                <label>Owner</label>
                            </div>
                            <ErrorMessage
                                id="errorType"
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
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <ErrorMessage
                                id="errorPassword"
                                name="password"
                                className="error"
                                component="p"
                            />
                            <div>
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                            </div>
                            <Field
                                className="sign-up-form-field-width"
                                name="confirmPassword"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            />
                            <ErrorMessage
                                id="errorConfirmPassword"
                                name="confirmPassword"
                                className="error"
                                component="p"
                            />

                            <button
                                id="submit"
                                className="btn btn-dark mt-3"
                                type="submit"
                                disabled={formik.isSubmitting}
                            >
                                Register
                            </button>
                            <button
                                id="register"
                                className="btn btn-danger mt-3 ms-3 "
                                type="reset"
                            >
                                Reset
                            </button>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
};

export default SignUpForm;

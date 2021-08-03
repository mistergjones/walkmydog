import React, { useEffect, useState } from "react";
//The useLocation hook returns the location object that represents the current URL.
import { Redirect } from "react-router-dom";
import TextField from "../UI/TextField/TextField";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import useApi from "../../hooks/useApi";
import usersApi from "../../api/glenusers";

const bcrypt = require("bcryptjs");

function LoginForm(props) {
    const { request: getUserByEmail } = useApi(usersApi.getUserByEmail);
    // establish a state to determine if login successful or not
    const [loginSuccess, setLoginSuccess] = useState(false);

    const getSpecificUser = async (formData) => {
        // 1. Obtain email and password field form fields
        var inputtedEmail = formData.email;
        var inputtedPassword = formData.password;

        // 2. get the user information based on the email address and get the password
        // NOTE: NEED TO CHECK FOR NULL/UNDEFINED EMAIL addresses if no match
        const { data: specificUser } = await getUserByEmail(inputtedEmail);

        // 3. Compare the hashed pasword to with the inputted pasword. SET to TRUE if good.
        return bcrypt.compareSync(
            inputtedPassword,
            specificUser.user["password"]
        )
            ? true
            : false;
    };

    useEffect(() => {
        // getUser(userId);

        return () => {
            console.log("What is this");
        };
    }, []);

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
        <>
            {loginSuccess ? (
                <Redirect to="/newListings" />
            ) : (
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    // call the function to validate the inputed values
                    validationSchema={validate}
                    // need to do something e.g. check the info from the database
                    onSubmit={async (fields) => {
                        let result = await getSpecificUser(fields);
                        setLoginSuccess(result);
                    }}
                >
                    {(formik) => (
                        <div>
                            <h1 className="my-4 font-weight-bold-display-4">
                                Log-in{" "}
                            </h1>
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
                                <button
                                    className="btn btn-dark mt-3"
                                    type="submit"
                                >
                                    Login
                                </button>
                                <button
                                    className="btn btn-danger mt-3 ms-3"
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

export default LoginForm;

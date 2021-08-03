import React, { useContext, useState } from 'react';
import "./ProfileContent.css"
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from '../Components/UI/TextField/TextField';
import useApi from '../hooks/useApi';
import glenusersApi from '../api/glenusers';
import AuthContext from '../context/authContext';
import jwtDecode from 'jwt-decode';
import storageService from '../storage/localStorage';
import { Redirect } from 'react-router-dom';





// establish Yup to error check the submitted values in the form fields
const validate = Yup.object({
    phone: Yup.string()
        .required("Phone number is required")
        .length(10)

});
function ProfileContent(props) {
    const [error, setError] = useState(null);
    const { user, setUser } = useContext(AuthContext);
    const { request: updateProfile } = useApi(glenusersApi.updateProfile);
    return (
        <> {error && <h1>{error}</h1>}
            {user.hasProfile ?
                <Redirect to="/newlistings" /> :
                <Formik
                    initialValues={{
                        phone: "",
                    }}
                    // call the function to validate the inputed values
                    validationSchema={validate}
                    // need to do something e.g. check the info from the database
                    onSubmit={async (fields) => {
                        // send request.
                        try {
                            const response = await updateProfile({ profile: { ...user, ...fields } });
                            // Get new token hasProfile = true
                            console.log(response.status);
                            if (response.status !== 200) {

                                setError(response.data);
                                return;

                            }
                            console.log(response)
                            const token = response.headers["x-auth-token"];
                            const userToken = jwtDecode(token);
                            storageService.setToken(token);
                            setUser(userToken);

                            // return userToken ? true : false;

                        } catch (error) {
                            console.log("error submit form = ", error)
                        }
                    }}
                >
                    {(formik) => (
                        <div>
                            <h1 className="my-4 font-weight-bold-display-4">

                            </h1>

                            <Form className="ms-3">
                                <TextField
                                    label="Phone Number"
                                    name="phone"
                                    type="text"
                                    maxLength={10}

                                />

                                <button
                                    className="btn btn-dark mt-3"
                                    type="submit"
                                >
                                    Update
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
                </Formik>}
        </>)

}

export default ProfileContent;
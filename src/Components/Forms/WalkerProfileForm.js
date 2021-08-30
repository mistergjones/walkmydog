import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "../UI/TextField/TextField";
import useApi from "../../hooks/useApi";
import walkersApi from "../../api/walker";
import AuthContext from "../../context/authContext";
import "./WalkerProfileForm.css";
import jwtService from "../../storage/jwt";
import ProfileRedirect from "./ProfileRedirect";

const validate = Yup.object({
    firstname: Yup.string()
        .min(2, "Minimum of 2 characters")
        .max(100, "Must be 100 characters or less")
        .required("First Name is required"),
    lastname: Yup.string()
        .min(2, "Minimum of 2 chacters")
        .max(100, "Must be 100 characters or less")
        .required("Last Name is required"),
    streetAddress: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Street Address is required"),
    suburb: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Suburb is required"),
    state: Yup.string()
        .max(3, "Must be 3 characters or less")
        .required("State is required"),
    postcode: Yup.string()
        .min(4, "Must be 4 digits")
        .max(4, "Must be 4 digits")
        .required("Post Code is required"),
    mobile: Yup.string()
        .min(10, "Mobile number must bet 10 digits")
        .max(10, "Mobile number must be 10 didits")
        .required("Mobile number is required"),
    dob: Yup.date().required("Date of birth is required"),
    driverLicence: Yup.string().required("License Number is required"),
    bankName: Yup.string().required("Bank name is required"),
    bsb: Yup.string().required("BSB is required"),
    accountNumber: Yup.string().required("Account number is required"),
    size: Yup.array()
        .min(1, "Need to select at least 1 dog size")
        .required("Required"),
    serviceType: Yup.array()
        .min(1, "Need to select at least 1 service type")
        .required("Required"),
});

function WalkerProfileForm(props) {
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [widget, setWidget] = useState(null);
    const { user, setUser } = useContext(AuthContext);
    const [profileUrl, setProfileUrl] = useState("/Whippet.jpg");
    const { request: updateProfile } = useApi(walkersApi.updateProfile);

    useEffect(() => {
        setWidget(
            window.cloudinary.createUploadWidget(
                {
                    cloud_name: "dqnazdwqk",
                    upload_preset: "gr2bgrfy",
                    sources: ["local"],
                    multiple: false,
                },
                function (error, result) {
                    console.log("result = " + result + "error = " + error);
                    setError(error);
                    setResult(result);
                    if (result) setProfileUrl(result[0].url);
                }
            )
        );
    }, []);
    console.log("user = ", user);
    return (
        <>
            <Formik
                initialValues={{
                    firstname: user.firstname,
                    lastname: user.lastname,
                    streetAddress: "",
                    suburb: "",
                    state: "",
                    postcode: "",
                    mobile: "",
                    dob: "",
                    driverLicence: "",
                    bankName: "",
                    bsb: "",
                    accountNumber: "",
                    size: [],
                    serviceType: [],
                }}
                // call the function to validate the inputed values
                validationSchema={validate}
                // need to do something e.g. check the info from the database
                onSubmit={async (fields) => {
                    console.log("user profile =", user);

                    // send request.
                    try {
                        const response = await updateProfile({
                            profile: {
                                type: user.type,
                                id: user.id,
                                email: user.email,
                                ...fields,
                                profileUrl,
                            },
                        });
                        // Get new token hasProfile = true
                        console.log("Profile screen response =", response);
                        // GET JWT TOKEN FROM RESPONSE AND DECODE TO USER OBJECT IF NO TOKEN RETURNS NULL;
                        setUser(jwtService.getUserFromResponseToken(response));
                    } catch (error) {
                        console.log("error submit profile form = ", error);
                    }
                }}
            >
                {({ values, handleChange, resetForm }) => (
                    <>
                        <ProfileRedirect />

                        <Form>
                            <div className="walker-form-container">
                                <section>
                                    <div className="walker-profile-form-container">
                                        <h1 className="walker-profile-form-heading">
                                            Person Details
                                        </h1>
                                        <div className="walker-profile-form-field-col-1">
                                            <TextField
                                                name="firstname"
                                                type="text"
                                                placeholder="First Name"
                                                value={values.firstname}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-2">
                                            <TextField
                                                name="lastname"
                                                type="text"
                                                placeholder="Last Name"
                                                value={values.lastname}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-2-col-span">
                                            <TextField
                                                name="streetAddress"
                                                type="text"
                                                placeholder="Street Address"
                                                value={values.streetAddress}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-1">
                                            <TextField
                                                name="suburb"
                                                type="text"
                                                placeholder="Suburb"
                                                value={values.suburb}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-2">
                                            <TextField
                                                name="postcode"
                                                type="text"
                                                placeholder="Postcode"
                                                value={values.postcode}
                                                onChange={handleChange}
                                                maxLength={4}
                                                minLength={4}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-1">
                                            <TextField
                                                name="state"
                                                type="text"
                                                placeholder="State"
                                                value={values.state}
                                                onChange={handleChange}
                                                maxLength={3}
                                                minLength={2}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-2">
                                            <TextField
                                                name="mobile"
                                                type="text"
                                                placeholder="Mobile #"
                                                value={values.mobile}
                                                onChange={handleChange}
                                                maxLength={10}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-1">
                                            <TextField
                                                name="dob"
                                                type="date"
                                                placeholder="Date of Birth"
                                                value={values.dob}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-2">
                                            <TextField
                                                name="driverLicence"
                                                type="text"
                                                placeholder="Driver Licence Number"
                                                value={values.driverLicence}
                                                onChange={handleChange}
                                                maxLength={10}
                                            />
                                        </div>
                                    </div>
                                    <div className="walker-profile-form-container">
                                        <h1 className="walker-profile-form-heading">
                                            Bank Details
                                        </h1>
                                        <div className="walker-profile-form-field-2-col-span">
                                            <TextField
                                                name="bankName"
                                                type="text"
                                                placeholder="Bank name"
                                                value={values.bankName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-1">
                                            <TextField
                                                name="bsb"
                                                type="text"
                                                placeholder="bsb"
                                                value={values.bsb}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-2">
                                            <TextField
                                                name="accountNumber"
                                                type="text"
                                                placeholder="Account number"
                                                value={values.accountNumber}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <div className="walker-profile-form-container">
                                        <h1 className="walker-profile-form-heading">
                                            Preferences
                                        </h1>
                                        <h2 className="walker-profile-form-subheading">
                                            Dog Size
                                        </h2>

                                        <div className="walker-profile-form-field-2-col-span-checkbox">
                                            <div className="walker-profile-form-checkbox">
                                                <label>Small</label>
                                                <input
                                                    id="smallDog"
                                                    name="size"
                                                    type="checkbox"
                                                    value="S"
                                                    onChange={handleChange}
                                                    checked={values.size.includes(
                                                        "S"
                                                    )}
                                                />
                                            </div>
                                            <div className="walker-profile-form-checkbox">
                                                <label>Medium</label>
                                                <input
                                                    id="mediumDog"
                                                    name="size"
                                                    type="checkbox"
                                                    value="M"
                                                    onChange={handleChange}
                                                    checked={values.size.includes(
                                                        "M"
                                                    )}
                                                />
                                            </div>
                                            <div className="walker-profile-form-checkbox">
                                                <label>Large</label>
                                                <input
                                                    id="largeDog"
                                                    label="Large"
                                                    name="size"
                                                    type="checkbox"
                                                    value="L"
                                                    onChange={handleChange}
                                                    checked={values.size.includes(
                                                        "L"
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <ErrorMessage
                                                name="size"
                                                className="error"
                                                component="p"
                                            />
                                        </div>

                                        <h2 className="walker-profile-form-subheading">
                                            Service Type
                                        </h2>

                                        <div className="walker-profile-form-field-2-col-span-checkbox">
                                            <div className="walker-profile-form-checkbox">
                                                <label>Home Visits</label>
                                                <input
                                                    id="homeVisits"
                                                    name="serviceType"
                                                    type="checkbox"
                                                    value={"Home"}
                                                    onChange={handleChange}
                                                    checked={values.serviceType.includes(
                                                        "Home"
                                                    )}
                                                />
                                            </div>
                                            <div className="walker-profile-form-checkbox">
                                                <label>Walks</label>
                                                <input
                                                    id="walks"
                                                    name="serviceType"
                                                    type="checkbox"
                                                    value="Walks"
                                                    onChange={handleChange}
                                                    checked={values.serviceType.includes(
                                                        "Walks"
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <ErrorMessage
                                                name="serviceType"
                                                className="error"
                                                component="p"
                                            />
                                        </div>

                                        <h2 className="walker-profile-form-subheading">
                                            Photo
                                        </h2>
                                        <div className="walker-profile-form-field-col-1 walker-profile-form-upload-container">
                                            {
                                                <img
                                                    className="walker-profile-form-upload-photo"
                                                    src={profileUrl}
                                                />
                                            }
                                        </div>
                                        <div className="walker-profile-form-field-col-2 walker-profile-form-upload-container">
                                            <button
                                                className="btn btn-dark mt-2"
                                                onClick={() => widget.open()}
                                            >
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="walker-profile-form-field-2-col-span">
                                <button
                                    id="submit"
                                    className="btn btn-dark mt-2"
                                    type="submit"
                                >
                                    Update
                                </button>
                                <button
                                    id="reset"
                                    className="btn btn-danger mt-2 ms-3"
                                    type="reset"
                                >
                                    Reset
                                </button>
                            </div>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    );
}

export default WalkerProfileForm;

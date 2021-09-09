import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "../UI/TextField/TextField";
import useApi from "../../hooks/useApi";
import walkersApi from "../../api/walker";
import AuthContext from "../../context/authContext";
import "./WalkerProfileForm.css";
import jwtService from "../../storage/jwt";
import ProfileRedirect from "./ProfileRedirect";
import loadBMaps from "../../maps/bingMaps";
import AddressTextField from "../UI/TextField/AddressTextField";

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
        .max(30, "Must be 30 characters or less")
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
    const [address, setAddress] = useState(null);

    useEffect(() => {
        window.selectedSuggestion = function (result) {
            setAddress(result);
            console.log("result = ", result);
        };

        loadBMaps(() => console.log("call back"));
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
                    console.log("fields = ", fields);
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
                                lat: address.location.latitude,
                                lng: address.location.longitude,
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
                {(formik) => (
                    <>
                        <ProfileRedirect />

                        <Form id="formikform" autoComplete="off">
                            <div className="walker-form-container">
                                <section>
                                    <div className="walker-profile-form-container">
                                        <h1 className="walker-profile-form-heading">
                                            Person Details
                                        </h1>
                                        <div className="walker-profile-form-field-col-1">
                                            <TextField
                                                label="First Name"
                                                name="firstname"
                                                type="text"
                                                placeholder="First Name"
                                                value={formik.values.firstname}
                                                onChange={formik.handleChange}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-2">
                                            <TextField
                                                label="Last Name"
                                                name="lastname"
                                                type="text"
                                                placeholder="Last Name"
                                                value={formik.values.lastname}
                                                onChange={formik.handleChange}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>

                                        <div
                                            id="searchBoxContainer"
                                            className="walker-profile-form-field-2-col-span"
                                        >
                                            <AddressTextField
                                                label="Address"
                                                id="searchBox"
                                                name="streetAddress"
                                                type="text"
                                                placeholder="Street Address"
                                                value={
                                                    formik.values.streetAddress
                                                }
                                                onChange={formik.handleChange}
                                                address={
                                                    address
                                                        ? address.address
                                                              .addressLine
                                                        : null
                                                }
                                            />
                                        </div>

                                        <div className="walker-profile-form-field-col-1">
                                            <AddressTextField
                                                label="Suburb"
                                                id="suburb"
                                                name="suburb"
                                                type="text"
                                                placeholder="Suburb"
                                                value={formik.values.suburb}
                                                address={
                                                    address
                                                        ? address.address
                                                              .locality
                                                        : null
                                                }
                                                onChange={formik.handleChange}
                                                disabled
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-2">
                                            <AddressTextField
                                                label="Post Code"
                                                id="postcode"
                                                name="postcode"
                                                type="text"
                                                placeholder="Post Code"
                                                value={formik.values.postcode}
                                                address={
                                                    address
                                                        ? address.address
                                                              .postalCode
                                                            ? address.address
                                                                  .postalCode
                                                            : "3000"
                                                        : null
                                                }
                                                disabled
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-1">
                                            <AddressTextField
                                                label="State"
                                                name="state"
                                                type="text"
                                                placeholder="State"
                                                value={formik.values.state}
                                                disabled
                                                onChange={formik.handleChange}
                                                address={
                                                    address
                                                        ? address.address
                                                              .adminDistrict
                                                        : null
                                                }
                                                maxLength={20}
                                                minLength={2}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-2">
                                            <TextField
                                                label="Mobile"
                                                name="mobile"
                                                type="text"
                                                placeholder="Mobile #"
                                                value={formik.values.mobile}
                                                onChange={formik.handleChange}
                                                maxLength={10}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-1">
                                            <TextField
                                                label="DOB"
                                                name="dob"
                                                type="date"
                                                placeholder="Date of Birth"
                                                value={formik.values.dob}
                                                onChange={formik.handleChange}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-2">
                                            <TextField
                                                label="Driver License #"
                                                name="driverLicence"
                                                type="text"
                                                placeholder="Driver Licence Number"
                                                value={
                                                    formik.values.driverLicence
                                                }
                                                onChange={formik.handleChange}
                                                maxLength={10}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="walker-profile-form-container">
                                        <h1 className="walker-profile-form-heading">
                                            Bank Details
                                        </h1>
                                        <div className="walker-profile-form-field-2-col-span">
                                            <TextField
                                                label="Bank Name"
                                                name="bankName"
                                                type="text"
                                                placeholder="Bank name"
                                                value={formik.values.bankName}
                                                onChange={formik.handleChange}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-1">
                                            <TextField
                                                label="BSB"
                                                name="bsb"
                                                type="text"
                                                placeholder="BSB"
                                                value={formik.values.bsb}
                                                onChange={formik.handleChange}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="walker-profile-form-field-col-2">
                                            <TextField
                                                label="Account Name"
                                                name="accountNumber"
                                                type="text"
                                                placeholder="Account number"
                                                value={
                                                    formik.values.accountNumber
                                                }
                                                onChange={formik.handleChange}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <div className="walker-profile-form-container">
                                        <h2 className="walker-profile-form-heading">
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
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    checked={formik.values.size.includes(
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
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    checked={formik.values.size.includes(
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
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    checked={formik.values.size.includes(
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

                                        <h2 className="walker-profile-form-heading">
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
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    checked={formik.values.serviceType.includes(
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
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    checked={formik.values.serviceType.includes(
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

                                        <h2 className="walker-profile-form-heading">
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

import React, { useContext, useState, useEffect } from "react";
import "./OwnerProfileForm.css";
import TextField from "../UI/TextField/TextField";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";

import useApi from "../../hooks/useApi";
import ownersApi from "../../api/owners";
import dogsApi from "../../api/dogs";

import AuthContext from "../../context/authContext";
import jwtService from "../../storage/jwt";
import ProfileRedirect from "./ProfileRedirect";

import helpers from "../../Helpers/convertDateTime";
import RadioButton from "../UI/RadioButtons/RadioButton";

import loadBMaps from "../../maps/bingMaps";
import AddressTextField from "../UI/TextField/AddressTextField";

// implement Yup error handling
const validate = Yup.object().shape({
    firstname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Firstname is required"),
    lastname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Lastname is required"),
    streetAddress: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Street Address is required"),
    suburb: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Suburb is required"),
    state: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("State is required"),
    postcode: Yup.number()
        .min(4, "Must be 4 digits")
        .required("Postcode is required"),
    mobile: Yup.string()
        .min(10, "Mobile number must be 10 digits")
        .max(10, "Mobile number must be 10 digits")
        .required("Mobile # is required"),
    dob: Yup.string().required("DOB is required"),
    driverLicence: Yup.string()
        .min(10, "Driver Licence must be 10 digits")
        .required("Driver Licence Numer is required"),
    bankName: Yup.string()
        .max(20, "Bank name must be <= 20 digits")
        .required("Bank Name is qequired"),
    bsb: Yup.string()
        .max(6, "BSB must be <= 6 digits")
        .required("6 Digit BSB is Required"),
    accountNumber: Yup.string()
        .max(10, "Account Number must be <= 10 digits")
        .required("Account Number is Required"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms and Conditions"),
    dogName: Yup.string()
        .min(2, "Dog name must be >= 2 letters")
        .required("Dog name is required"),
    dogBreed: Yup.string()
        .min(2, "Dog name must be >= 2 letters")
        .required("Dog Breed is required"),
    dogSize: Yup.string().required("Please select your dog size"),
    requiresLeash: Yup.string().required(
        "Yes or No: Does your dog require an always on leash?"
    ),
});

function OwnerProfileForm(props) {
    const { setUser, user } = useContext(AuthContext);
    // const { request: getOwners } = useApi(ownersApi.getOwners);
    const { request: getOwner } = useApi(ownersApi.getOwner);
    // const { request: updateOwner } = useApi(ownersApi.updateOwner);
    // const { request: insertDog } = useApi(dogsApi.insertDog);
    // const { request: getOwnerFromCredentialByEmail } = useApi(
    //     ownersApi.getOwnerFromCredentialByEmail
    // );

    const { request: updateOwnerProfile } = useApi(
        ownersApi.updateOwnerProfile
    );

    // establish the use of BING MAPS address search.
    const [address, setAddress] = useState(null);

    useEffect(() => {
        window.selectedSuggestion = function (result) {
            setAddress(result);
        };
        loadBMaps(() => console.log("call back"));
    }, []);

    // user object has keys: email, firsntame, hasProfile, id, lastname, type
    // console.log("GLEN THE USER TOKEN INFO IS: ", user);

    // This function allows a user who has signed up as a DOG OWNER to complete their enrollment by providing
    // their personal, bank account and dog details.
    // If the form is valid, this information is then updated in the OWNER, DOG and CREDETIAL tables
    const updatedOwner = async (formData) => {
        // 1.0 Convert the DOB field from AUS format to US format to suit Postgress.
        formData.dob = helpers.formatAusDateToUSDate(formData.dob);

        // create an entire data object taht will be used to store both Owner and Dog Info Objects
        let ownerDataObject = {};

        try {
            // console.log("FORM DATA is:", formData);
            // console.log("USER is", user);

            // DOG INFO PART
            // 1.0 Obtain owner information from owner table based on 'user' TOKEN credential_id. This is required so we can insert the OWNER_ID into the DOG TABLE. e.g. map a dog to their owner_id
            const ownerObj = await getOwner(user.id);
            // console.log("ownerObj = ", ownerObj);

            if (ownerObj.data.owner.length === 0) {
                console.log("Failed to obain the owner information");
            }

            // 2.0 Get all the infromation for the ownerDataObj.
            // GJ: 15/09: changed the order to have ...user first to ensure the submitted
            // formData with firstname and lastname were retained when committing to the DB
            ownerDataObject = {
                ...user,
                ...formData,
                // id: user.id,
                // hasProfile: user.hasProfile,
                // iat: user.iat,
                // email: user.email,
                // type: user.type,
                owner_id: ownerObj.data.owner[0].owner_id,
            };

            const response = await updateOwnerProfile({
                profile: ownerDataObject,
            });

            // console.log("WTF WTF WTF", response);

            // GET JWT TOKEN FROM RESPONSE AND DECODE TO USER OBJECT. IF NO TOKEN RETURNS NULL;
            setUser(jwtService.getUserFromResponseToken(response));
        } catch (error) {
            console.log("ownerProfileForm -> UpdatedOwner()", error);
        }
    };

    return (
        <>
            <ProfileRedirect />
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
                    acceptTerms: false,
                    dogName: "",
                    dogBreed: "",
                    dogSize: "",
                    requiresLeash: "",
                }}
                // validate the input fields to the schema above
                validationSchema={validate}
                // onSubmit={(values) => console.log(values)}
                // onSubmit={async () => {
                //     await getOwners();
                // }}
                onSubmit={async (fields) => {
                    try {
                        console.log("Fields are: ", fields);
                        // need to update the owner table. NOTE: RATING and MEMBERHSIP_ACTIVE are hardcode in the SQL directly
                        const response = await updatedOwner({
                            ...fields,
                            lat: address.location.latitude,
                            lng: address.location.longitude,
                        });
                    } catch (error) {}
                }}
            >
                {(formik) => (
                    <div>
                        <Form id="formikform" autoComplete="off">
                            <div className="owner-form-container">
                                <section>
                                    <div className="owner-profile-form-container">
                                        <h1 className="owner-profile-form-heading">
                                            Owner Details
                                        </h1>
                                        <div className="owner-profile-form-field-col-1">
                                            <TextField
                                                label="First Name"
                                                name="firstname"
                                                type="text"
                                                placeholder="Firstname"
                                                value={formik.values.firstname}
                                                onChange={formik.handleChange}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>

                                        <div className="owner-profile-form-field-col-2">
                                            <TextField
                                                label="Last Name"
                                                name="lastname"
                                                type="text"
                                                placeholder="Lastname"
                                                value={formik.values.lastname}
                                                onChange={formik.handleChange}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>

                                        {/* <div className="owner-profile-form-field-2-col-span">
                                            <TextField
                                                label="Street Address"
                                                name="streetAddress"
                                                type="text"
                                                placeholder="Street Address"
                                            />
                                        </div> */}
                                        <div
                                            id="searchBoxContainer"
                                            className="owner-profile-form-field-2-col-span"
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

                                        {/* <div className="owner-profile-form-field-col-1">
                                            <TextField
                                                label="Suburb"
                                                name="suburb"
                                                type="text"
                                                placeholder="Suburb"
                                            />
                                        </div> */}
                                        <div className="owner-profile-form-field-col-1">
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

                                        {/* <div className="owner-profile-form-field-col-2">
                                            <TextField
                                                label="State"
                                                name="state"
                                                type="text"
                                                placeholder="State"
                                                maxLength={3}
                                                minLength={2}
                                            />
                                        </div> */}

                                        <div className="owner-profile-form-field-col-2">
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

                                        {/* <div className="owner-profile-form-field-col-1">
                                            <TextField
                                                label="Postcode"
                                                label="Postcode"
                                                name="postcode"
                                                type="number"
                                                placeholder="Postcode"
                                                maxLength={4}
                                                minLength={4}
                                            />
                                        </div> */}

                                        <div className="owner-profile-form-field-col-1">
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

                                        <div className="owner-profile-form-field-col-2">
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

                                        <div className="owner-profile-form-field-col-1">
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

                                        <div className="owner-profile-form-field-col-2">
                                            <TextField
                                                label="Driver Licence No:"
                                                name="driverLicence"
                                                type="text"
                                                placeholder="Driver Licence #"
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

                                    <div className="owner-profile-form-container">
                                        <h1 className="owner-profile-form-heading">
                                            Bank Details
                                        </h1>
                                        <div className="owner-profile-form-field-2-col-span">
                                            <TextField
                                                label="Bank Name"
                                                name="bankName"
                                                type="text"
                                                placeholder="Bank Name"
                                                value={formik.values.bankName}
                                                onChange={formik.handleChange}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="owner-profile-form-field-col-1">
                                            <TextField
                                                label="BSB"
                                                name="bsb"
                                                type="text"
                                                placeholder="BSB "
                                                value={formik.values.bsb}
                                                onChange={formik.handleChange}
                                                onKeyPress={(e) =>
                                                    e.code === "Enter"
                                                        ? e.preventDefault()
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="owner-profile-form-field-col-2">
                                            <TextField
                                                label="Account No:"
                                                name="accountNumber"
                                                type="text"
                                                placeholder="Account Number"
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
                                    <div className="owner-profile-form-container">
                                        <h1 className="owner-profile-form-heading">
                                            Dog Details
                                        </h1>

                                        <div className="owner-profile-form-field-col-1">
                                            <TextField
                                                label="Dog Name"
                                                name="dogName"
                                                type="text"
                                                placeholder="Dog Name"
                                                value={formik.values.dogName}
                                                onChange={formik.handleChange}
                                            />
                                        </div>

                                        <div className="owner-profile-form-field-col-2">
                                            <TextField
                                                label="Breed"
                                                name="dogBreed"
                                                type="text"
                                                placeholder=" Dog Breed"
                                                value={formik.values.dogBreed}
                                                onChange={formik.handleChange}
                                            />
                                        </div>

                                        {/* <div>
                            <TextField
                                // label="Dog Photo"
                                name="dogPhoto"
                                type="text"
                                placeholder="NOT WORKING - PLACEHOLDER Dog Photo"
                            />
                            </div> */}

                                        <div className="owner-profile-form-field-2-col-span">
                                            <h1 className="owner-profile-form-heading">
                                                Dog Size
                                            </h1>
                                            <div className="sign-up-form-radio-buttons">
                                                <RadioButton
                                                    label="Small Dog"
                                                    id="smallDog"
                                                    type="radio"
                                                    name="dogSize"
                                                    value="S"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />

                                                <RadioButton
                                                    label="Medium Dog"
                                                    id="mediumDog"
                                                    type="radio"
                                                    name="dogSize"
                                                    value="M"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />

                                                <RadioButton
                                                    label="Large Dog"
                                                    id="largeDog"
                                                    type="radio"
                                                    name="dogSize"
                                                    value="L"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="owner-profile-form-field-2-col-span">
                                            <h1 className="owner-profile-form-heading">
                                                Always Leashed?
                                            </h1>
                                            <div className="sign-up-form-radio-buttons">
                                                <RadioButton
                                                    label="Yes"
                                                    id="requiresLeash"
                                                    type="radio"
                                                    name="requiresLeash"
                                                    value="YES"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />

                                                <RadioButton
                                                    label="No"
                                                    id="doesNotRequireLeash"
                                                    type="radio"
                                                    name="requiresLeash"
                                                    value="NO"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />
                                            </div>
                                            {/* <Field
                                type="radio"
                                name="requiresLeash"
                                value="TRUE"
                                label="Leashed?"
                                onChange={formik.handleChange}
                                selected={
                                    formik.values.type === "TRUE" ? true : false
                                }
                            />
                            <label>Leashed?</label>

                            <Field
                                type="radio"
                                name="requiresLeash"
                                value="FALSE"
                                label="No Leash"
                                onChange={formik.handleChange}
                                selected={
                                    formik.values.type === "FALSE"
                                        ? true
                                        : false
                                }
                            />
                            <label>No Leashed</label> */}
                                        </div>

                                        <div className="owner-profile-form-field-2-col-span">
                                            <h1 className="owner-profile-form-heading">
                                                Accept Terms?
                                            </h1>
                                            <label
                                                htmlFor="acceptTerms"
                                                className="accept_terms"
                                            >
                                                <Field
                                                    id="acceptTerms"
                                                    type="checkbox"
                                                    name="acceptTerms"
                                                />
                                                Accept Terms and Conditions
                                            </label>

                                            <ErrorMessage
                                                name="acceptTerms"
                                                className="error"
                                                component="p"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="owner-profile-form-field-2-col-span">
                                <button
                                    id="submit"
                                    className="btn btn-dark mt-3"
                                    type="submit"
                                >
                                    Create Profile
                                </button>
                                <button
                                    id="reset"
                                    className="btn btn-danger mt-3 ms-3"
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
}

export default OwnerProfileForm;

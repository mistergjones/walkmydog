import React, { useContext } from "react";
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

function OwnerProfileForm(props) {
    const { setUser, user } = useContext(AuthContext);
    // const { request: getOwners } = useApi(ownersApi.getOwners);
    const { request: getOwner } = useApi(ownersApi.getOwner);

    const { request: updateOwner } = useApi(ownersApi.updateOwner);
    const { request: insertDog } = useApi(dogsApi.insertDog);

    console.log("GLEN THE USER TOKEN INFO IS: ", user);

    // now update the owner and dog table with this INFORMATION.
    // NOTE: CREDENTIAL ID IS HARDCODES UNTIL CODE MIGRATION/UPDATES
    const updatedOwner = async (formData) => {
        // convert the AUS DATE to US DATA Format to store in Database
        formData.dob = helpers.formatAusDateToUSDate(formData.dob);

        try {
            // 0.0 Obtain owner information from owner table based on 'user' TOKEN credential_id. This is required so we can insert the OWNER_ID into the DOG TABLE
            var credentialId = user.id;
            const ownerObj = await getOwner(credentialId);
            // establish data object to prepare for key/value pair of owner id
            const ownerDataObj = {};
            ownerDataObj.owner_id = ownerObj.data.owner[0].owner_id;

            // 1.0 Update the owner info into the table
            const ownerResponse = await updateOwner(formData);
            // console.log(
            //     "ownerProfile.js -> DO I GET A owner RESPONSE?????",
            //     ownerResponse
            // );

            // 2.0 need to insert the dog info into the dog table and pass the owner ID
            const dogInfo = {
                dogName: formData.dogName,
                dogBreed: formData.dogBreed,
                dogSize: formData.dogSize,
                requiresLeash: formData.requiresLeash,
                owner_id: ownerDataObj.owner_id,
            };

            const dogResponse = await insertDog(dogInfo);
            // console.log(
            //     "ownerProfile.js -> DO I GET A dog RESPONSE?????",
            //     dogResponse
            // );

            // GET JWT TOKEN FROM RESPONSE AND DECODE TO USER OBJECT. IF NO TOKEN RETURNS NULL;
            setUser(jwtService.getUserFromResponseToken(ownerResponse));
        } catch (error) {
            console.log("ownerProfileForm -> updatedOwner()", error);
        }
    };

    // implement Yup error handling
    const validate = Yup.object().shape({
        firstname: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        lastname: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        streetAddress: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
        suburb: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
        postcode: Yup.number().min(4, "Must be 4 digits").required("Required"),
        mobile: Yup.string()
            .min(10, "Mobile number must be 10 digits")
            .max(10, "Mobile number must be 10 digits")
            .required("Required"),
        dob: Yup.string().required("Required"),
        driverLicence: Yup.string()
            .min(10, "Driver Licence must be 10 digits")
            .required("Required"),
        bankName: Yup.string()
            .max(20, "Bank name must be <= 20 digits")
            .required("Required"),
        BSB: Yup.string()
            .max(6, "BSB must be <= 6 digits")
            .required("Required"),
        accountNumber: Yup.string()
            .max(10, "Account Number must be <= 10 digits")
            .required("Required"),
        acceptTerms: Yup.bool().oneOf([true], "Accept Terms and Conditions"),
        dogName: Yup.string()
            .min(2, "Dog name must be >= 2 letters")
            .required("Required"),
        dogBreed: Yup.string()
            .min(2, "Dog name must be >= 2 letters")
            .required("Required"),
        dogSize: Yup.string().required("Please select your dog size"),
        requiresLeash: Yup.bool().oneOf(
            [true],
            "Does your dog require an always on leash?"
        ),
    });
    return (
        <Formik
            initialValues={{
                firstname: "",
                lastname: "",
                streetAddress: "",
                suburb: "",
                postcode: "",
                mobile: "",
                dob: "",
                driverLicence: "",
                bankName: "",
                BSB: "",
                accountNumber: "",
                acceptTerms: false,
                dogName: "",
                dogBreed: "",
                dogSize: "",
                requiresLeash: false,
            }}
            // validate the input fields to the schema above
            validationSchema={validate}
            // onSubmit={(values) => console.log(values)}
            // onSubmit={async () => {
            //     await getOwners();
            // }}
            onSubmit={async (fields) => {
                // console.log("Fields are: ", fields);

                // need to update the owner table. NOTE: RATING and MEMBERHSIP_ACTIVE are hardcode in the SQL directly
                await updatedOwner(fields);
            }}
        >
            {(formikInfo) => (
                <div>
                    <h1 className="my-4 font-weight-bold display-4">
                        Owner Registration
                    </h1>
                    <Form>
                        {/* <TextField name="email" type="text" value={ID} /> */}
                        <div className="row">
                            <div className="col">
                                <TextField
                                    // label="Firstname"
                                    name="firstname"
                                    type="text"
                                    placeholder="Firstname"
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    // label="Lastname"
                                    name="lastname"
                                    type="text"
                                    placeholder="Lastname"
                                />
                            </div>
                        </div>

                        <TextField
                            // label="Street Address"
                            name="streetAddress"
                            type="text"
                            placeholder="Street Address"
                        />
                        <div className="row">
                            <div className="col">
                                <TextField
                                    // label="Suburb"
                                    name="suburb"
                                    type="text"
                                    placeholder="Suburb"
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    // label="Postcode"
                                    name="postcode"
                                    type="number"
                                    placeholder="Postcode"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <TextField
                                    // label="Mobile"
                                    name="mobile"
                                    type="text"
                                    placeholder="Mobile #"
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    // label="DOB"
                                    name="dob"
                                    type="date"
                                    placeholder="DOB: DD-MM-YYYY"
                                />
                            </div>
                        </div>

                        <TextField
                            // label="Driver Licence No:"
                            name="driverLicence"
                            type="text"
                            placeholder="Driver Licence #"
                        />

                        <div className="row">
                            <div className="col">
                                <TextField
                                    // label="Bank Name"
                                    name="bankName"
                                    type="text"
                                    placeholder="Bank Name"
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    // label="BSB"
                                    name="BSB"
                                    type="text"
                                    placeholder="BSB #"
                                />
                            </div>
                        </div>
                        <TextField
                            // label="Account No:"
                            name="accountNumber"
                            type="text"
                            placeholder="Account Number"
                        />

                        <div className="row">
                            <div className="col">
                                <TextField
                                    // label="Dog Name"
                                    name="dogName"
                                    type="text"
                                    placeholder="Dog Name"
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    // label="Breed"
                                    name="dogBreed"
                                    type="text"
                                    placeholder=" Dog Breed"
                                />
                            </div>
                        </div>

                        {/* <div>
                            <TextField
                                // label="Dog Photo"
                                name="dogPhoto"
                                type="text"
                                placeholder="NOT WORKING - PLACEHOLDER Dog Photo"
                            />
                        </div> */}

                        <div className="sign-up-form-radio-buttons">
                            <label htmlFor="">
                                Small Dog:
                                <Field type="radio" name="dogSize" value="S" />
                            </label>

                            <label htmlFor="">
                                Medium Dog:
                                <Field type="radio" name="dogSize" value="M" />
                            </label>

                            <label htmlFor="">
                                Large Dog:
                                <Field type="radio" name="dogSize" value="L" />
                            </label>
                        </div>
                        <ErrorMessage
                            name="dogSize"
                            className="error"
                            component="p"
                        />

                        <div className="sign-up-form-radio-buttons">
                            <label htmlFor="">
                                Yes - Leash always required?:
                                <Field
                                    type="radio"
                                    name="requiresLeash"
                                    value="TRUE"
                                />
                            </label>

                            <label htmlFor="">
                                No - Leash not required:
                                <Field
                                    type="radio"
                                    name="requiresLeash"
                                    value="FALSE"
                                />
                            </label>
                        </div>
                        <ErrorMessage
                            name="requiresLeash"
                            className="error"
                            component="p"
                        />

                        <label htmlFor="acceptTerms" className="accept_terms">
                            <Field type="checkbox" name="acceptTerms" />
                            Accept Terms and Conditions
                        </label>

                        <ErrorMessage
                            name="acceptTerms"
                            className="error"
                            component="p"
                        />

                        <div></div>
                        <button className="btn btn-dark mt-3" type="submit">
                            Create Profile
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
    );
}

export default OwnerProfileForm;

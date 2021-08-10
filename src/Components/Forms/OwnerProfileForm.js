import React from "react";
import "./OwnerProfileForm.css";
import TextField from "../UI/TextField/TextField";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DogDetails from "./DogDetails";

function OwnerProfileForm(props) {
    // implement Yup error handling
    const validate = Yup.object({
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
            .min(10, "Mobile number must bet 10 digits")
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
        acceptTerms: Yup.boolean()
            .oneOf([true])
            .required("Accept Terms and Conditions"),
        dogName: Yup.string()
            .min(2, "Dog name must be >= 2 letters")
            .required("Required"),
        dogBreed: Yup.string()
            .min(2, "Dog name must be >= 2 letters")
            .required("Required"),
        requiresLeash: Yup.string().required("You must select 1 option"),
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
                requiresLeash: "",
            }}
            // validate the input fields to the schema above
            validationSchema={validate}
            onSubmit={(values) => console.log(values)}
        >
            {(formikInfo) => (
                <div>
                    <h1 className="my-4 font-weight-bold display-4">
                        Owner Registration
                    </h1>
                    <Form>
                        <TextField
                            // label="Firstname"
                            name="firstname"
                            type="text"
                            placeholder="Firstname"
                        />
                        <TextField
                            // label="Lastname"
                            name="lastname"
                            type="text"
                            placeholder="Lastname"
                        />

                        <TextField
                            // label="Street Address"
                            name="streetAddress"
                            type="text"
                            placeholder="Street Address"
                        />
                        <TextField
                            // label="Suburb"
                            name="suburb"
                            type="text"
                            placeholder="Suburb"
                        />
                        <TextField
                            // label="Postcode"
                            name="postcode"
                            type="number"
                            placeholder="e.g. 3000"
                        />
                        <TextField
                            // label="Mobile"
                            name="mobile"
                            type="text"
                            placeholder="e.g. 04..."
                        />
                        <TextField
                            // label="DOB"
                            name="dob"
                            type="date"
                            placeholder="DD-MM-YYYY"
                        />
                        <TextField
                            // label="Driver Licence No:"
                            name="driverLicence"
                            type="text"
                            placeholder="Driver Licence #"
                        />
                        <TextField
                            // label="Bank Name"
                            name="bankName"
                            type="text"
                            placeholder="e.g. CBA / NAB"
                        />
                        <TextField
                            // label="BSB"
                            name="BSB"
                            type="text"
                            placeholder="123456"
                        />
                        <TextField
                            // label="Accouht No:"
                            name="accountNumber"
                            type="text"
                            placeholder="1234567890"
                        />

                        <div>
                            <label htmlFor="acceptTerms">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    id="acceptTerms"
                                />
                                Accept Terms and Conditions
                            </label>
                        </div>

                        <TextField
                            // label="Breed"
                            name="dogBreed"
                            type="text"
                            placeholder=" Dog Breed"
                        />
                        <TextField
                            // label="Dog Name"
                            name="dogName"
                            type="text"
                            placeholder="Dog Name"
                        />

                        {/* <label htmlFor="requiresLeash">
                            <input
                                type="checkbox"
                                name="requiresLeash"
                                id="requiresLeash"
                            />
                            Reqires Leash
                        </label> */}
                        <div>
                            <label htmlFor="">
                                <Field
                                    type="radio"
                                    name="requiresLeash"
                                    value="Y"
                                />
                                Yes - Requires Leash:
                            </label>

                            <label htmlFor="">
                                <Field
                                    type="radio"
                                    name="requiresLeash"
                                    value="N"
                                />
                                No - No leash required:
                            </label>
                        </div>
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

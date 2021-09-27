import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from "formik";

import * as Yup from "yup";
import TextField from '../UI/TextField/TextField';
import SelectDropdown from '../UI/SelectDropdown/SelectDropdown';
import TeaxtArea from '../UI/TextArea/TeaxtArea';
import useApi from "../../hooks/useApi";
import bookindgsApi from "../../api/bookings";
import ownersApi from "../../api/owners"
import AuthContext from '../../context/authContext';

import { useHistory } from "react-router-dom";
import routes from '../../routes/routes';
import "./BookingForm.css"

const validate = Yup.object({

    bookingDate: Yup.date()
        .required("Booking Date is required"),
    bookingTime: Yup.string()
        .required("Booking time required"),
    serviceType: Yup.string()
        .required("Service Type required"),
    mobile: Yup.string()
        .min(10, "Mobile number must bet 10 digits")
        .max(10, "Mobile number must be 10 didits")
        .required("Mobile number is required"),
});


function BookingForm(props) {
    const { user } = useContext(AuthContext);
    const { request: createBooking } = useApi(bookindgsApi.createBooking);
    const { request: getOwner } = useApi(ownersApi.getOwner);
    const [owner, setOwner] = useState();
    let history = useHistory();
    const today = new Date();
    let formattedDate = `${today.getFullYear()}-${today.getMonth.length < 2 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate.length < 2 ? `0${today.getDate()}` : today.getDate()}`
    const loadOwnerDetails = async () => {
        const ownerDetails = await getOwner(user.id);
        setOwner(ownerDetails.data.owner[0]);

    }
    useEffect(() => {
        loadOwnerDetails();


    }, []);

    return (

        <>

            <Formik

                initialValues={{
                    bookingDate: "",
                    bookingTime: "",
                    serviceType: "",
                    mobile: "",
                    specialInstructions: ""

                }}

                // call the function to validate the inputed values
                validationSchema={validate}
                // need to do something e.g. check the info from the database
                onSubmit={async (fields) => {

                    // send request.
                    try {
                        const response = await createBooking({
                            booking: {
                                ...fields,
                                id: owner.owner_id
                            }
                        })

                        if (response.status === 200) {

                            history.push(routes.DASHBOARD_OWNER)
                        } else {
                            // TODO: Set an error message
                        }
                    } catch (error) {
                        // console.log("error submit profile form = ", error);
                    }
                }}
            >
                {(formik) => (

                    <>

                        <Form id="formikform" autoComplete="off">
                            <div className="booking-form-container">

                                <div className="booking-form-detail-container">
                                    <h1 className="walker-profile-form-heading">
                                        Booking Details
                                    </h1>
                                    <div className="walker-profile-form-field-col-1">
                                        <TextField
                                            label="Date of booking"
                                            name="bookingDate"
                                            type="date"
                                            value={formik.values.bookingDate}
                                            onChange={formik.handleChange}
                                            min={formattedDate}


                                        />
                                    </div>
                                    <div className="walker-profile-form-field-col-2">
                                        <TextField
                                            label="Time of booking"
                                            name="bookingTime"
                                            type="time"
                                            value={formik.values.bookingTime}
                                            onChange={formik.handleChange}


                                        />
                                    </div>

                                    <div className="walker-profile-form-field-col-1">


                                        <SelectDropdown
                                            id="serviceType"
                                            name="serviceType"
                                            onChange={formik.handleChange}
                                            value={formik.values.serviceType}
                                            label="Choose type of service:"
                                        >
                                            <option value="">Click arrow to select</option>
                                            <option value="30WO">30 minute walk</option>
                                            <option value="60WO">60 minute walk</option>
                                            <option value="30HV">30 minute home visit</option>
                                            <option value="60HV">60 minute home visit</option>

                                        </SelectDropdown>


                                    </div>
                                    <div className="walker-profile-form-field-col-2">
                                        <TextField
                                            label="Contact Mobile"
                                            name="mobile"
                                            type="text"
                                            placeholder="Mobile #"
                                            value={formik.values.mobile}
                                            onChange={formik.handleChange}
                                            maxLength={10}
                                            onKeyPress={e => e.code === "Enter" ? e.preventDefault() : ""}
                                        />
                                    </div>
                                    <div className="walker-profile-form-field-2-col-span">
                                        <TeaxtArea
                                            label="Special Instructions"
                                            name="specialInstructions"
                                            placeholder="Enter your instructions here"
                                            rows="5"
                                            onChange={formik.handleChange}
                                            value={formik.values.specialInstructions}
                                        />
                                    </div>
                                    <div className="walker-profile-form-field-2-col-span booking-form-detail-buttons">
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
                                </div>

                            </div>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    );
}

export default BookingForm;
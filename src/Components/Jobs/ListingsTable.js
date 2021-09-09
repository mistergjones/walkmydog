import React, { useState, useEffect, useContext } from "react";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";
import { convertDateTime } from "../../Helpers/convertDateTime";
import useApi from "../../hooks/useApi";

import AuthContext from "../../context/authContext";
import * as geokit from "geokit";
import SelectDropdownNoForm from "../UI/SelectDropdown/SelectDropdownNoForm";
import CheckBoxNoForm from "../UI/CheckBox/CheckBoxNoForm";

// const distances = loc2.filter(loc => geokit.distance(loc1, loc) < 10);
function ListingsTable({ data, preferences }) {
    const [finalisedData, setFinalisedData] = useState([]);
    const [distanceFromWalker, setDistanceFromWalker] = useState(20);
    const [dogSize, setDogSize] = useState(
        preferences.size_preference.split("")
    );
    const [walks, setWalks] = useState(
        preferences.walker_30wo !== 1 ? true : false
    );
    const [homeVisit, setHomeVisit] = useState(
        preferences.walker_30hv !== 1 ? true : false
    );

    const filterBookings = () => {
        let preferencesLocation = {};
        preferencesLocation.lat = Number(preferences.lat);
        preferencesLocation.lng = Number(preferences.lng);

        const filteredData = data.filter((booking) => {
            let bookingLocation = {};
            bookingLocation.lat = Number(booking.lat);
            bookingLocation.lng = Number(booking.lng);
            if (
                geokit.distance(preferencesLocation, bookingLocation) >
                distanceFromWalker
            )
                return false;
            if (!dogSize.includes(booking.dog_size)) return false;
            if (
                (!walks && booking.service_type === "30WO") ||
                (!walks && booking.service_type === "60WO")
            )
                return false;
            if (
                (!homeVisit && booking.service_type === "30HV") ||
                (!homeVisit && booking.service_type === "60HV")
            )
                return false;

            return true;
        });
        setFinalisedData(filteredData);
    };

    useEffect(() => {
        filterBookings();
    }, [data, distanceFromWalker, dogSize, walks, homeVisit]);
    const { LISTINGS_DETAIL } = routes;

    const handleDogSizesClicked = (size) => {
        let sizes = [...dogSize];

        !sizes.includes(size)
            ? sizes.push(size)
            : sizes.splice(sizes.indexOf(size), 1);

        setDogSize(sizes);
    };
    return (
        <div className="listings-container">
            <div className="preferences-container">
                <h1> Preferences</h1>

                <SelectDropdownNoForm
                    id="distance"
                    name="distance"
                    onChange={(e) =>
                        setDistanceFromWalker(Number(e.currentTarget.value))
                    }
                >
                    <option value="">Select distance from you</option>
                    <option value="1">1 kms</option>
                    <option value="5">5 kms</option>
                    <option value="10">10 kms</option>
                    <option value="15">15 kms</option>
                    <option value="20">20 kms</option>
                </SelectDropdownNoForm>

                <div className="preferences-dog-size">
                    <h2 className="preferences-subheading">Dog Size</h2>
                    <div className="preference-checkbox-container">
                        <div className="container-checkbox">
                            <label className="container-checkbox">
                                {" "}
                                Small
                                <input
                                    type="checkbox"
                                    name={"dogSize"}
                                    defaultChecked={dogSize.includes("S")}
                                    value="S"
                                    onClick={() => handleDogSizesClicked("S")}
                                />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div className="container-checkbox">
                            <label className="container-checkbox">
                                {" "}
                                Medium
                                <input
                                    type="checkbox"
                                    name={"dogSize"}
                                    defaultChecked={dogSize.includes("M")}
                                    value="M"
                                    onClick={() => handleDogSizesClicked("M")}
                                />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div className="container-checkbox">
                            <label className="container-checkbox">
                                {" "}
                                Large
                                <input
                                    type="checkbox"
                                    name={"dogSize"}
                                    defaultChecked={dogSize.includes("L")}
                                    value="L"
                                    onClick={() => handleDogSizesClicked("L")}
                                />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="preferences-service-type">
                    <h2 className="preferences-subheading">Service Type</h2>
                    <div className="preference-checkbox-container">
                        <div className="container-checkbox">
                            <label className="container-checkbox">
                                {" "}
                                Walks
                                <input
                                    type="checkbox"
                                    name={"walks"}
                                    defaultChecked={walks}
                                    value="S"
                                    onClick={() => setWalks(!walks)}
                                />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div className="container-checkbox">
                            <label className="container-checkbox">
                                {" "}
                                Home Visits
                                <input
                                    type="checkbox"
                                    name={"homeVisits"}
                                    defaultChecked={homeVisit}
                                    value="S"
                                    onClick={() => setHomeVisit(!homeVisit)}
                                />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <table className="tbl tbl--block">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Suburb</th>
                        <th>Service</th>
                        {/* <th>Dog Name</th> */}
                        <th>Service Fee</th>
                    </tr>
                </thead>
                <tbody className="listings-table-data">
                    {finalisedData.map((booking, idx) => (
                        <tr key={idx}>
                            <td>
                                {" "}
                                <NavLink
                                    to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                >
                                    {booking.date}
                                </NavLink>
                            </td>
                            <td>
                                <NavLink
                                    to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                >
                                    {booking.start_time}
                                </NavLink>
                            </td>
                            <td>
                                <NavLink
                                    to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                >
                                    {booking.suburb}
                                </NavLink>
                            </td>
                            <td>
                                <NavLink
                                    to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                >
                                    {booking.service_type}
                                </NavLink>
                            </td>
                            {/* <td><NavLink to={`${LISTINGS_DETAIL}${booking.booking_id}`}>{booking.dog_firstname}</NavLink></td> */}
                            <td>
                                <NavLink
                                    to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                >
                                    ${booking.service_fee}
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListingsTable;

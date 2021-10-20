import React, { useState, useEffect, useContext } from "react";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";
import { convertDateTime } from "../../Helpers/convertDateTime";
import useApi from "../../hooks/useApi";
import walkersApi from "../../api/walker";

import AuthContext from "../../context/authContext";
import * as geokit from "geokit";
import SelectDropdownNoForm from "../UI/SelectDropdown/SelectDropdownNoForm";
import CheckBoxNoForm from "../UI/CheckBox/CheckBoxNoForm";

// const distances = loc2.filter(loc => geokit.distance(loc1, loc) < 10);
function ListingsTable({ data, preferences }) {
    // GJ: 12/10 Added user context in order to then obtain assigned bookings for the walker
    const { user, setUser } = useContext(AuthContext);
    const { request: getAssignedWalks } = useApi(walkersApi.getAssignedWalks);
    const [hasClashData, setHasClashData] = useState([]);
    const [hasZeroWalksAssigned, setHasZeroWalksAssigned] = useState([]);

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

    // GJ: 12/10: This function obtains the currently assigned walks to the walker and determines if there is a timeslot clash. If no walks assigned, set a status to TRUE to aid in conditional render
    const obtainWalkersAssignedBookings = async () => {
        const results = await getAssignedWalks(user.id);
        // outer loop is walks assinged to walker
        if (results.data.length !== 0) {
            for (var i = 0; i < results.data.length; i++) {
                // inner loop is the data loaded within this page
                for (var j = 0; j < data.length; j++) {
                    // recreating startTime as data.start_time is already formatted to human readable format
                    var recreatedStartTime =
                        parseInt(data[j].end_time) - data[j].duration;
                    // cater for the cartesian product.
                    if (data[j].hasClash !== "Yes") {
                        // check each row if there is a clash, add the value to the new key
                        if (
                            results.data[i].start_time <= data[j].end_time &&
                            recreatedStartTime <= results.data[i].end_time
                        ) {
                            data[j].hasClash = "Yes";
                        } else {
                            data[j].hasClash = "No";
                        }
                        recreatedStartTime = null;
                    }
                    // update 'data' with the new clash data info
                    setHasClashData(data);
                    setHasZeroWalksAssigned(false);
                }
            }
        } else {
            // this is set to TRUE because if there are blank walks assigned, we need to make sure we can show records that can be clickable.
            // setFinalisedData(data);
            setHasZeroWalksAssigned(true);
        }
    };

    useEffect(() => {
        obtainWalkersAssignedBookings();
        filterBookings();
    }, [hasClashData, data, distanceFromWalker, dogSize, walks, homeVisit]);
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
                                <span className="checkmark"></span>
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
                                <span className="checkmark"></span>
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
                                <span className="checkmark"></span>
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
                                <span className="checkmark"></span>
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
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <table id="glen" className="tbl tbl--block">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Suburb</th>
                        <th>Service</th>
                        {/* <th>Dog Name</th> */}
                        <th>Service Fee</th>
                        <th>Clashes</th>
                    </tr>
                </thead>
                <tbody className="listings-table-data">
                    {finalisedData.map((booking, idx) =>
                        // conditional render. If no clash, make link clickable to book....else, make row non-clickable
                        hasZeroWalksAssigned || booking.hasClash === "No" ? (
                            <tr key={idx}>
                                <td>
                                    <NavLink
                                        name="listingData"
                                        // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                        to={{
                                            pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                            showBookButtonProp: {
                                                showBookButton: true,
                                            },
                                        }}
                                    >
                                        {booking.date}
                                    </NavLink>
                                </td>
                                <td>
                                    <NavLink
                                        // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                        to={{
                                            pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                            showBookButtonProp: {
                                                showBookButton: true,
                                            },
                                        }}
                                    >
                                        {booking.start_time}
                                    </NavLink>
                                </td>
                                <td>
                                    <NavLink
                                        // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                        to={{
                                            pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                            showBookButtonProp: {
                                                showBookButton: true,
                                            },
                                        }}
                                    >
                                        {booking.suburb}
                                    </NavLink>
                                </td>
                                <td>
                                    <NavLink
                                        // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                        to={{
                                            pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                            showBookButtonProp: {
                                                showBookButton: true,
                                            },
                                        }}
                                    >
                                        {booking.service_type}
                                    </NavLink>
                                </td>

                                <td>
                                    <NavLink
                                        // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                        to={{
                                            pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                            showBookButtonProp: {
                                                showBookButton: true,
                                            },
                                        }}
                                    >
                                        ${booking.service_fee}
                                    </NavLink>
                                </td>

                                <td>
                                    <NavLink
                                        // to={`${LISTINGS_DETAIL}${booking.booking_id}`}
                                        to={{
                                            pathname: `${LISTINGS_DETAIL}${booking.booking_id}`,
                                            showBookButtonProp: {
                                                showBookButton: true,
                                            },
                                        }}
                                    >
                                        No
                                    </NavLink>
                                </td>
                            </tr>
                        ) : (
                            <tr
                                key={idx}
                                style={{
                                    color: "black",
                                    backgroundColor: "rgb(206, 133, 237)",
                                }}
                            >
                                <td>{booking.date}</td>
                                <td>{booking.start_time}</td>
                                <td>{booking.suburb}</td>
                                <td>{booking.service_type}</td>
                                <td>${booking.service_fee}</td>
                                <td>Yes</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListingsTable;

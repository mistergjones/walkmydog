import React, { useEffect, useState, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useApi from '../../hooks/useApi';
import bookingsApi from "../../api/bookings";
import AuthContext from '../../context/authContext';
import walkersApi from "../../api/walker"
import "./CalendarInfo.css";
import { formatTime12Hour, formatAusDate } from '../../Helpers/convertDateTime';
import JobInfoCard from '../UI/Card/JobInfoCard';
import DogInfoCard from "../UI/Card/DogInfoCard";
import WalkerInfoCard from "../UI/Card/WalkerInfoCard";

// We add the moment library to provide localization with the momentLocalizer function.
const localizer = momentLocalizer(moment);



export default function MyCalendar() {
    const { request: getBookings } = useApi(bookingsApi.getAssignedJobsForOwner);
    const { request: getWalks } = useApi(walkersApi.getAssignedWalks);
    const [events, setEvents] = useState([]);
    const [jobInfo, setJobInfo] = useState();
    const [dogInfo, setDogInfo] = useState();
    const [walkerInfo, setWalkerInfo] = useState();

    const { user } = useContext(AuthContext);

    const loadBookings = async () => {
        let eventsArray = [];
        if (user.type === "O") {

            const { data } = await getBookings(user.id);
            let assignedJobs = formatEvents(data.assignedJobs);
            let openJobs = formatEvents(data.openJobs);
            eventsArray = [...assignedJobs, ...openJobs]

        } else if (user.type === "W") {
            const { data } = await getWalks(user.id);
            eventsArray = formatEvents(data);

        }
        setEvents(eventsArray);
    }

    const formatEvents = (data) => {
        console.log(data);
        let formattedEvents = [];

        data.map((d, i) => {
            formattedEvents.push(
                {
                    title: d.service_type,
                    start: new Date(Number(d.start_time)),
                    end: new Date(Number(d.end_time)),
                    suburb: d.suburb,
                    date: (d.date),
                    startTime: (d.start_time),
                    endTime: (d.end_time),
                    serviceType: d.service_type,
                    serviceFee: d.service_fee,
                    dogFirstname: d.dog_firstname,
                    dogBreed: d.dog_breed,
                    dogSize: d.dog_size,
                    dogAlwaysLeashed: d.dog_always_leashed,
                    walkerFirstname: d.booking_status === "A" ? d.firstname : "unassigned",
                    walkerRating: d.booking_status === "A" ? d.overall_rating : 0,
                    walkerSuburb: d.booking_status === "A" ? d.walkers_suburb : "unassigned",
                }
            )
        })

        return formattedEvents;
    }
    useEffect(() => {
        loadBookings();
    }, [])


    const handleSelect = (e) => {
        setJobInfo({
            suburb: e.suburb,
            date: e.date,
            startTime: e.startTime,
            endTime: e.endTime,
            serviceType: e.serviceType,
            serviceFee: e.serviceFee
        })

        if (user.type === "W") {
            setDogInfo(
                {
                    dogFirstname: e.dogFirstname,
                    dogSize: e.dogSize,
                    dogAlwaysLeashed: e.dogAlwaysLeashed,
                    dogBreed: e.dogBreed
                }
            );
        }
        if (user.type === "O") {
            setWalkerInfo({
                suburb: e.walkerSuburb,
                rating: e.walkerRating,
                firstname: e.walkerFirstname
            })
        }
    };

    const eventStyleGetter = (event, start, end, isSelected) => {


        var style = {
            backgroundColor: "purple",
            borderRadius: "5px",
            opacity: 0.8,
            color: "white",
            border: "10px",
            display: "block",
            textAlign: "center"
        };
        return {
            style: style,
        };
    };

    return (
        <div className="calendar-screen-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start" //startAccessor is the property for the start date of events.
                endAccessor="end" //endAccessor is the property for the end date of events.
                style={{ height: 375, color: "purple" }}
                defaultDate={moment().toDate()}
                onSelectEvent={(e) => handleSelect(e)}
                views={["month", "day", "week", "agenda"]}
                toolbar={true}
                defaultView="month"
                // onDoubleClickEvent={}
                // rtl="true"
                eventPropGetter={eventStyleGetter}
            />
            <div className="job-info-details">
                {jobInfo && <div>
                    <JobInfoCard job={jobInfo} />
                </div>}

                {
                    dogInfo && <div>
                        <DogInfoCard dog={dogInfo} />
                    </div>
                }
                {
                    walkerInfo && <div>
                        <WalkerInfoCard walker={walkerInfo} />
                    </div>
                }

            </div>
        </div>
    );
}

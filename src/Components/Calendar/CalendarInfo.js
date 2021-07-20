import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// We add the moment library to provide localization with the momentLocalizer function.
const localizer = momentLocalizer(moment);

const myEventsList = [
    {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 22),
        desc: "eat lunch",
    },
    {
        id: 1,
        title: "Long Event",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 21),
        desc: "Drink beer",
    },

    {
        id: 6,
        title: "Meeting",
        start: new Date(2021, 6, 12, 10, 30, 0, 0), //10:30 am
        end: new Date(2021, 6, 12, 12, 30, 0, 0), //12:30pm
        desc: "Pre-meeting meeting, to prepare for the meeting",
    },
];

export default function MyCalendar() {
    const gj = (meeting) => {
        console.log("The Meeting Title is: ", meeting.desc);
    };
    return (
        <div className="App">
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start" //startAccessor is the property for the start date of events.
                endAccessor="end" //endAccessor is the property for the end date of events.
                style={{ height: 500 }}
                defaultDate={moment().toDate()}
                onSelectEvent={gj}
                // views={["month", "day", "agenda"]}
                // toolbar={true}
            />
        </div>
    );
}

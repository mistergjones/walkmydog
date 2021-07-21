import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// We add the moment library to provide localization with the momentLocalizer function.
const localizer = momentLocalizer(moment);

const myEventsList = [
    {
        id: 0,
        title: "Janet walks Fido",
        allDay: false,
        start: new Date(2021, 6, 20, 10, 30, 0, 0),
        end: new Date(2021, 6, 20, 11, 0, 0, 0),
        desc: "eat lunch",
    },
    {
        id: 1,
        title: "Long Event",
        allDay: false,
        start: new Date(2021, 6, 20, 12, 0, 0, 0),
        end: new Date(2021, 6, 20, 13, 0, 0, 0),
        desc: "Drink beer",
    },

    {
        id: 2,
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

    const hj = (meeting) => {
        console.log("What is here???", meeting);
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log("The event is: ", event);
        var backgroundColor = "#" + event.hexColor;
        var style = {
            backgroundColor: "yellow",
            borderRadius: "0px",
            opacity: 0.8,
            color: "red",

            border: "10px",
            display: "block",
        };
        return {
            style: style,
        };
    };

    return (
        <div className="App">
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start" //startAccessor is the property for the start date of events.
                endAccessor="end" //endAccessor is the property for the end date of events.
                style={{ height: 500, color: "purple" }}
                defaultDate={moment().toDate()}
                onSelectEvent={gj}
                // views={["month", "day", "agenda"]}
                // toolbar={true}
                defaultView="week"
                onDoubleClickEvent={hj}
                // rtl="true"
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
}

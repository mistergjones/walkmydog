import React from 'react';
import MasterScreen from './Master/MasterScreen';
import CalendarInfo from '../Components/Calendar/CalendarInfo';
function CalendarScreen(props) {
    return (
        <MasterScreen
            ScreenComponent={CalendarInfo}
            heading={"Calendar"}
        />
    );
}

export default CalendarScreen;
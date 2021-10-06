// this function takes a data object and converts the start_time into a time format. i.e. 9:30 am
export const convertDateTime = (data) => {
    const formattedData = [];
    data.forEach((item) => {
        const formattedItem = item;
        formattedItem.date = formatAusDate(item.date);
        formattedItem.start_time = formatTime12Hour(item.start_time);
        formattedData.push(formattedItem);
    });

    return formattedData;
};

// Date stored in US format reverse the date to be AUS format
export const formatAusDate = (date) => {
    const newDate = new Date(date);


    let formattedDate = [];
    formattedDate[0] = newDate.getDate();
    formattedDate[1] = newDate.getMonth() + 1;
    formattedDate[2] = newDate.getFullYear();
    return formattedDate ? formattedDate.join("/") : "NA";
};

export const formatTime12Hour = (time) => {
    return new Date(Number(time)).toLocaleString("en-AU", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
};

// GJ: The fronted form caters for DD/MM/YYYY format but the database requires YYYY-MM-DD format. This routine changes the Form DOB Date to the required format
export const formatAusDateToUSDate = (dateInfo) => {
    return (dateInfo = dateInfo.split("/").reverse().join("-"));
};

export default {
    convertDateTime,
    formatAusDateToUSDate,
    formatTime12Hour,
    formatAusDate,
};

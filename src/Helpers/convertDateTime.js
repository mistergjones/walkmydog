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
    //console.log("date = " + date);

    let formattedDate = [];
    formattedDate[0] = Number(date.slice(0, 10).split("-")[2]) + 1;
    formattedDate[1] = date.slice(0, 10).split("-")[1];
    formattedDate[2] = date.slice(0, 10).split("-")[0];
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

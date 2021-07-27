// this function takes a data object and converts the start_time into a time format. i.e. 9:30 am
const convertDateTime = (data) => {
    const formattedData = [];

    data.forEach((item) => {
        const formattedItem = item;
        formattedItem.date = formatAusDate(item.date);
        formattedItem.start_time = formatTime12Hour(item.start_time);
        formattedData.push(formattedItem);
    });

    return formattedData;
}

// Date stored in US formate reverse the date to be AUS format
const formatAusDate = (date) => {
    return date.substr(0, 10).split("-").reverse().join("-");
}

const formatTime12Hour = (time) => {
    return new Date(time * 1000).
        toLocaleString("en-AU", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
}


export default convertDateTime;

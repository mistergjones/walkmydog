function convertDateTime(data) {
    const formattedData = [];
    data.forEach((item) => {
        const formattedItem = item;
        formattedItem.date = item.date.substr(0, 10);
        formattedItem.start_time = new Date(
            item.start_time * 1000
        ).toLocaleString("en-AU", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        formattedData.push(formattedItem);
    });

    return formattedData;
}

export default convertDateTime;

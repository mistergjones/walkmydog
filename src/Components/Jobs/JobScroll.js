import React, { useEffect, useState } from "react";
import "./JobScroll.css";
import convertDateTime from "../../Helpers/convertDateTime";
import ListingsTable from "./ListingsTable";



const JobScroll = ({ data }) => {
    const [finalisedData, setFormattedData] = useState([]);

    useEffect(() => {
        setFormattedData(convertDateTime(data));
    }, [data]);

    return (
        <div className="job-scroll-container">
            <ListingsTable data={finalisedData} />

        </div>
    );
};

export default JobScroll;

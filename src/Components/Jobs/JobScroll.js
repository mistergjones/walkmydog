import React, { useEffect, useState } from "react";
import "./JobScroll.css";
import ListingsTable from "./ListingsTable";



const JobScroll = ({ data, preferences }) => {


    return (
        <div className="job-scroll-container">

            <ListingsTable
                data={data}
                preferences={preferences}
            />

        </div>
    );
};

export default JobScroll;

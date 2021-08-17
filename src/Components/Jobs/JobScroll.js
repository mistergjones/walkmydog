import React, { useEffect, useState } from "react";
import "./JobScroll.css";
import ListingsTable from "./ListingsTable";



const JobScroll = ({ data }) => {


    return (
        <div className="job-scroll-container">
            <ListingsTable data={data} />

        </div>
    );
};

export default JobScroll;

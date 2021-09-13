import React, { useEffect, useState } from "react";
import "./WalkerJobScroll.css";
import WalkerJobTable from "./WalkerJobTable";

const WalkerJobScroll = ({ data }) => {
    return (
        <div className="job-scroll-container">
            <WalkerJobTable data={data} />
        </div>
    );
};

export default WalkerJobScroll;

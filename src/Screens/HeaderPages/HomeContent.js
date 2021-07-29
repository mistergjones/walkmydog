import React, { useEffect } from "react";
import "./HomeContent.css";


function HomeContent(props) {

    useEffect(() => {

        return () => {
            console.log("What is this");
        };
    }, []);

    return (
        <div>
            <h1>Home Screen</h1>
        </div>
    );
}
export default HomeContent;

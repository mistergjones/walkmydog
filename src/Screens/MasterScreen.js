import React from "react";
import Header from "../Components/MainHeader/MainHeader";
import Footer from "../Components/MainFooter/MainFooter";
import "./MasterScreen.css";

function MasterScreen({ ScreenComponent, heading }) {
    return (
        <div className="master-screen-container">
            <div className="header-container">
                <Header />
            </div>
            <div className="master-screen-heading">
                <h1>{heading}</h1>
            </div>
            <div className="content-container">
                <ScreenComponent />
            </div>
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
}

export default MasterScreen;

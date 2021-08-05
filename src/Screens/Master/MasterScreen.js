import React, { useContext, useEffect } from "react";
import Header from "../../Components/MainHeader/MainHeader";
import Footer from "../../Components/MainFooter/MainFooter";
import "./MasterScreen.css";
import AuthContext from "../../context/authContext";
import ErrorMessageDisplay from "../../Errors/ErrorMessageDisplay";

function MasterScreen({ ScreenComponent, heading }) {
    const { errorMessage, setErrorMessage } = useContext(AuthContext);

    useEffect(() => {
        // AIM IS TO CLEAR ERROR MESSAGE WHEN NEW SCREEN IS LOADED REMOVING OLD ERROR MESSAGE.
        setErrorMessage(null);
    }, [])

    return (
        <div className="master-screen-container">
            <div className="header-container">
                <Header />
            </div>
            <div className="master-screen-heading">
                <h1>{heading}</h1>
            </div>
            {/* ADDED ERROR MSG FOR EVERY SCREEN
             ERROR CAN BE SET FOR SCREEN THROUGH setErrorMessage ON CONTEXT 
             IF THERE IS AN ERROR SET IT AND IT WILL BE DISPLAYED 
            */}
            {errorMessage && <div>
                <ErrorMessageDisplay message={errorMessage} />
            </div>}
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

import React from "react";
import "./OwnerProfileScreen.css";
import profileImg from "../../Images/Owners/23.jpg";
import OwnerProfileForm from "../Forms/OwnerProfileForm";

function OwnerProfileContent(props) {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-8">
                    <OwnerProfileForm />
                </div>
                <div className="col-md-4 my-auto">
                    <img className="img-fluid w-100" src={profileImg} alt="" />
                </div>
            </div>
        </div>
    );
}

export default OwnerProfileContent;

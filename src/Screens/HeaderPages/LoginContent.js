import React, { useState } from "react";
import LoginDogImg from "../../Images/Login/LoginDog.png";
import LoginForm from "../../Components/Forms/LoginForm";

function LoginContent(props) {
    return (
        <div className="container mt-3 ">
            <div className="row">
                <div className="col-md-6 ">
                    <LoginForm />
                </div>
                <div className="col-md-5 my-auto text-center">
                    <img className="img-fluid w-50 " src={LoginDogImg} alt="" />
                </div>
            </div>
        </div>
    );
}

export default LoginContent;

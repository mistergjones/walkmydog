import React from "react";
import SignUpDogImg from "../../Images/SignUp/SignUpDog.png";
import SignUpForm from "../../Components/Forms/SignUpForm";

function SignUpContent(props) {
    return (
        <div className="container mt-3 ">
            <div className="row">
                <div className="col-md-6 border ">
                    <SignUpForm />
                </div>
                <div className="col-md-5 my-auto border  text-center">
                    <img
                        className="img-fluid w-50 "
                        src={SignUpDogImg}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default SignUpContent;

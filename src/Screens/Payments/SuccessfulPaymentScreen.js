import React from "react";
import MasterScreen from "../Master/MasterScreen";
import SuccessfulPaymentContent from "./SuccessfulPaymentContent";

function SuccessfulPaymentScreen() {
    return (
        <div className="">
            <MasterScreen
                ScreenComponent={SuccessfulPaymentContent}
                heading="Successful Payment"
            />
        </div>
    );
}

export default SuccessfulPaymentScreen;

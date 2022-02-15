import React from "react";
import MasterScreen from "../Master/MasterScreen";
import UnsuccessfulPaymentContent from "./UnsuccessfulPaymentContent";

export default function UnsuccessfulPayment() {
    return (
        <div>
            <MasterScreen
                ScreenComponent={UnsuccessfulPaymentContent}
                heading="Unsuccessful Payment"
            />
        </div>
    );
}

import React, { useState, useEffect } from "react";
import ConfirmationModal from "../../Components/UI/Modal/ConfirmationModal";

function SocialContent(props) {
    const [show, setShow] = useState(null);

    return (
        <div>
            <button onClick={() => setShow(true)}>SHOT</button>
            <ConfirmationModal onClose={() => setShow(false)} show={show} />
        </div>
    );
}

export default SocialContent;

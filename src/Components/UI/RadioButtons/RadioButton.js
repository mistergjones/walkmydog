import React from "react";

function RadioButton(props) {
    return (
        <div>
            <label htmlFor="walkerowner">Walker</label>
            <input type="radio" name="walkerowner" id="walker" />
            <label htmlFor="walkerowner">Owner</label>
            <input type="radio" name="walkerowner" id="owner" />
        </div>
    );
}

export default RadioButton;

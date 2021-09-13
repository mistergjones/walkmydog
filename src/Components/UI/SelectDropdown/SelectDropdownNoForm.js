import React from 'react';

function SelectDropdownNoForm(props) {

    return (
        <div className="select-dropdown-container">
            <label className="label-text" >{props.label}</label>
            <select

                className={`form-select shadow-none `}
                {...props}
                autoComplete="off"

            />

        </div>
    );
}




export default SelectDropdownNoForm;
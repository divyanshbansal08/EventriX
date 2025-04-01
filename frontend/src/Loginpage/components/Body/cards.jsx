import React from "react";

function Cards({ title, placeholder, value, onChange }) {
    return (
        <div className="signup_form_field-wrapper">
            <label className="signup_form_field-label">{title}</label>
            <input
                className="signup_form_input signup_form_input-1"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Cards;


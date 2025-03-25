import React from "react";

function Subbutton1(props) {
    return (<button className="signup_button signup_is-icon signup_max-width-full signup_button1-1 hover-button">
        <div class>
            {props.value}
        </div>
    </button>
    );
}
export default Subbutton1;
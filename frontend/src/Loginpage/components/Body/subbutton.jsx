import React from "react";

function Subbutton(props) {
    return (<div>
        <input type="submit" className="signup_button signup_max-width-full signup_button-1 hover-button-0" value={props.value} />
    </div>
    );
}
export default Subbutton;
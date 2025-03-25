import React from "react";
import Subbutton from "./subbutton";
import Subbutton1 from "./subbutton1";
function Button_login() {
    return (<div className="signup_form-button-wrapper">
        <Subbutton
            value="Log in" />
        <Subbutton1 value="Log in with Google" />
    </div>);
}
export default Button_login;
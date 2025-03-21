import React from "react";
import websiteLogo from "../assets/website_logo.png";

function Logo() {
    return (<div className="signup_navbar">
        <div className="logo">
            <img src={websiteLogo} />
        </div>
    </div>);
}
export default Logo;
import React from "react";
import websiteLogo from "../assets/website_logo.png";

function Logo_login() {
    return (<div className="login_navbar">
        <div className="logo">
            <img src={websiteLogo} />
        </div>
    </div>);
}
export default Logo_login;
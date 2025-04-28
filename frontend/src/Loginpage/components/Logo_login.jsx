import React from "react";
import websiteLogo from "../assets/website_logo.png";

function Logo_login() {
    return (<a className="login_navbar" href="/home">
        <a className="logo" href="/home">
            <img className="homepage_middle-logo-1" src={websiteLogo} />
        </a>
    </a>);
}
export default Logo_login;
import React from "react";
import websiteLogo from "./Logo.jpeg";

function Middle_Logo() {
    return (
        <div className="homepage_middle-logo-wrapper">
            <div className="homepage_middle-logo-wrapper-1">
                <a href="/home" className="homepage_middle-logo-0">
                    <img className="imgLogo" src={websiteLogo} alt="Event_webpage_Logo" />
                </a>
            </div>
        </div>
    );
}
export default Middle_Logo;
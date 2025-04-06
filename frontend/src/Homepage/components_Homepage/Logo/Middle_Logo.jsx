import React from "react";
import websiteLogo from "../../Assets_Homepage/website_logo.png";

function Middle_Logo() {
    return (
        <div className="homepage_middle-logo-wrapper">
            <div className="homepage_middle-logo-wrapper-1">
                <a className="homepage_middle-logo-0">
                    <img className="homepage_middle-logo-1" width="auto" src={websiteLogo} alt="Event_webpage_Logo" />
                </a>
            </div>
        </div>
    );
}
export default Middle_Logo;
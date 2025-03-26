import React from "react";
import Left_Logo from "./Logo/Left_Logo";
import Middle_Logo from "./Logo/Middle_Logo";
import Right_Logo_admin from "./Logo/Right_logo_admin";

function Logo_main_admin({ onLogout, onLogin, isLoggedIn }) {
    return (<div className="homepage_logo-div-01">
        <div className="homepage_logo-div-11">
            <div className="homepage_logo-div-2">
                <div className="homepage_logo-div-3">
                    <Left_Logo />
                    <Middle_Logo />
                    <Right_Logo_admin onLogout={onLogout} onLogin={onLogin} isLoggedIn={isLoggedIn} />
                </div>
            </div>
        </div>
    </div>);
}
export default Logo_main_admin;
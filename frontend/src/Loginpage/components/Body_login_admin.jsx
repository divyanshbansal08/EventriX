import React from "react";
import Tabs from "./Body/tabs";
import Tabscontent_login_admin from "./Body/Tabscontent_login_admin";
function Body_login_admin({ onLoginSuccess }) {
    return (
        <div className="login_content-left">
            <div className="signup_tabs">
                <Tabs />
                <Tabscontent_login_admin onLoginSuccess={onLoginSuccess} />
            </div>
        </div>
    );
}

export default Body_login_admin;
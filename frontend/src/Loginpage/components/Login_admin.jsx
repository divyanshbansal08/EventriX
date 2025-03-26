import React from "react";
import Logo_login from "./Logo_login";
import Footer_login from "./Footer_login";
import Logo_main from "../../Homepage/components_Homepage/Logo_main";
import Body_login_admin from "./Body_login_admin";


function Login_admin() {
    return (
        <div>
            <div className="main-div-login">
                <Logo_login />
                <Body_login_admin />
                <Footer_login />
            </div>
        </div>

    );
}

export default Login_admin;
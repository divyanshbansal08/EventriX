import React from "react";
import Logo_login from "./Logo_login";
import Body_login from "./Body_login";
import Footer_login from "./Footer_login";
import Logo_main from "../../Homepage/components_Homepage/Logo_main";


function Login() {
    return (
        <div>
            <div className="main-div-login">
                <Logo_login />
                <Body_login />
                <Footer_login />
            </div>
        </div>

    );
}

export default Login;


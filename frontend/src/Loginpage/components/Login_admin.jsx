import React from "react";
import Logo_login from "./Logo_login";
import Footer_login from "./Footer_login";
import Logo_main from "../../Homepage/components_Homepage/Logo_main";
import Body_login_admin from "./Body_login_admin";
import BackgroundImage from "../assets/login_img.png";


function Login_admin() {
    return (
        <div>
            <div className="main-div-login">
                {/* Left half */}
                <div className="login-left">
                    <Logo_login />
                    <Body_login_admin />
                    <Footer_login />
                </div>
                {/* Right half (background image) */}
                <div
                    className="login-right"
                    style={{
                        backgroundImage: `url(${BackgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "100%",
                    }}
                />
            </div>
        </div>

    );
}

export default Login_admin;
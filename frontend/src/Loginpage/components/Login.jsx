import React from "react";
import Logo_login from "./Logo_login";
import Body_login from "./Body_login";
import Footer_login from "./Footer_login";
import Logo_main from "../../Homepage/components_Homepage/Logo_main";
import BackgroundImage from "../assets/login_img.png";


function Login() {
    return (
        <div className="main-div-login">
            {/* Left half */}
            <div className="login-left">
                <Logo_login />
                <Body_login />
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
    );
}


export default Login;


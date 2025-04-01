import React from "react";
import Left_Logo from "./Left_Logo";
import Middle_Logo from "./Middle_Logo";
import Right_Logo from "./Right_Logo";

function Navbar({ onLogout, onLogin, isLoggedIn }) {
    return (
        <div className="homepage_logo-div-01 border-b-2 border-[#1a1a1a]">
            <div className="homepage_logo-div-11">
                <div className="homepage_logo-div-2">
                    <div className="homepage_logo-div-3">
                        <Left_Logo />
                        <Middle_Logo />
                        <Right_Logo onLogout={onLogout} onLogin={onLogin} isLoggedIn={isLoggedIn} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
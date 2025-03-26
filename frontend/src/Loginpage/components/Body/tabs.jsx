import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Tabs() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeDiv, setActiveDiv] = useState(localStorage.getItem("activeTab") || "div1");

    useEffect(() => {
        localStorage.setItem("activeTab", activeDiv);
    }, [activeDiv]);

    const handleClick = (divId, path) => {
        setActiveDiv(divId);
        navigate(path);
    };

    return (
        <div className="signup_tabs-menu">
            <div
                onClick={() => handleClick("div1", "/login")}
                className={`signup_tab-link ${location.pathname === "/login" ? "active" : ""} tab-anim`}
            >
                <div>Student</div>
            </div>
            <div
                onClick={() => handleClick("div2", "/login-admin")}
                className={`signup_tab-link ${location.pathname === "/login-admin" ? "active" : ""} tab-anim`}
            >
                <div>Admin</div>
            </div>
        </div>
    );
}

export default Tabs;

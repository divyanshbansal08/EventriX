import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo_main from "./Logo_main";
import Body from "./Body";
import SpiderManImage from "../Assets_Homepage/marvels-spider-man--11990.jpeg";

function Home() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [success, setSuccess] = useState('');
    const [messageKey, setMessageKey] = useState(0);

    // On mount, check if a token exists.
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    // Set the logout success message only once if we navigated with loggedOut state.
    useEffect(() => {
        if (location.state && location.state.loggedOut && !success) {
            setSuccess("Logged out successfully");
            setMessageKey(prev => prev + 1);
        }
    }, [location, success]);

    // Handle logout: remove token and trigger fade-out animation.
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsExiting(true);
    };

    // Navigate to login page.
    const handleLogin = () => {
        navigate("/login");
    };

    // Define animation properties. If arriving with loggedOut state, animate in.
    const animationProps =
        location.state && location.state.loggedOut
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 } }
            : { initial: { opacity: 1 }, animate: { opacity: isExiting ? 0 : 1 }, transition: { duration: 0.5 } };

    return (
        <div className="homepage_main-div-0">
            {/* Background Image */}
            <div
                className="background-image-main"
                style={{
                    backgroundImage: `url(${SpiderManImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1
                }}
            />

            {/* Top-right Button */}
            <div className="homepage_right-logo-wrapper">
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                ) : (
                    <button onClick={handleLogin} className="login-button">
                        Login
                    </button>
                )}
                {/* </div> */}
            </div>


            {/* Animated Main Content */}
            <motion.div
                {...animationProps}
                onAnimationComplete={() => {
                    // After fade-out, navigate to /home with loggedOut state so that the login button is shown.
                    if (isExiting) {
                        navigate("/home", { state: { loggedOut: true } });
                    }
                }}
            >
                <Logo_main />
                <Body />
            </motion.div>

            {/* Success Message at the Bottom */}
            <div
                style={{
                    position: "fixed",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2
                }}
            >
                <AnimatePresence mode="wait">
                    {success && (
                        <motion.div
                            key={messageKey}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="login_message login_message-success"
                            style={{
                                backgroundColor: "#52c41a",
                                color: "white",
                                border: "1px solid #73d13d",
                                boxShadow: "0 0 8px rgba(82, 196, 26, 0.6)"
                            }}
                        >
                            {success}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Home;

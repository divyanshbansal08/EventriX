import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo_main from "./Logo_main";
import Body from "./Body";
import BackgroundImage from "../Assets_Homepage/main_background.png";


function Home() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [success, setSuccess] = useState('');
    const [messageKey, setMessageKey] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        if (location.state && location.state.loggedOut && !success) {
            setSuccess("Logged out successfully");
            setMessageKey(prev => prev + 1);
        }
    }, [location, success]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsExiting(true);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const animationProps =
        location.state && location.state.loggedOut
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 } }
            : { initial: { opacity: 1 }, animate: { opacity: isExiting ? 0 : 1 }, transition: { duration: 0.5 } };

    return (
        <div className="homepage_main-div-0">
            <div
                className="background-image-main"
                style={{
                    backgroundImage: `url(${BackgroundImage})`,
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

            <Logo_main onLogout={handleLogout} onLogin={handleLogin} isLoggedIn={isLoggedIn} />

            <motion.div
                {...animationProps}
                onAnimationComplete={() => {
                    if (isExiting) {
                        navigate("/home", { state: { loggedOut: true } });
                    }
                }}
            >
                <Body />
            </motion.div>

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

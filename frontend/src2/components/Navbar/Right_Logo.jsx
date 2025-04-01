import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./styles_homepage.css";

function Right_Logo({ onLogout, onLogin, isLoggedIn }) {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Close the dropdown if clicking outside.
    const dropdownRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    // Handle Edit Profile.
    const handleEditProfile = () => {
        navigate("/edit-profile");
        setDropdownOpen(false);
    };

    return (
        <div className="homepage_right-logo-wrapper" style={{ position: "relative" }}>
            {isLoggedIn ? (
                <div className="profile-container" ref={dropdownRef}>
                    <div
                        className="profile-icon"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        style={{ cursor: "pointer" }}
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ borderRadius: "50%", backgroundColor: "#fff", padding: "5px" }}
                        >
                            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z" fill="#555" />
                            <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" fill="#555" />
                        </svg>
                    </div>
                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="profile-dropdown"
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    marginTop: "10px",
                                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                                    color: "#333",
                                    borderRadius: "12px",
                                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                                    padding: "10px 0",
                                    zIndex: 10,
                                    minWidth: "160px",
                                    overflow: "hidden"
                                }}
                            >
                                <div
                                    onClick={handleEditProfile}
                                    style={{
                                        padding: "12px 20px",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s",
                                        borderBottom: "1px solid #eaeaea"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f7f7f7"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                >
                                    Edit Profile
                                </div>
                                <div
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        onLogout();
                                    }}
                                    style={{
                                        padding: "12px 20px",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f7f7f7"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                >
                                    Logout
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <button onClick={onLogin} className="logo_main_button logo_main_max-width-full logo_main_button-1 hover-button-0 px-4 py-2">
                    Login
                </button>
            )}
        </div>
    );
}

export default Right_Logo;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles_Homepage/styles_homepage.css";
import axios from 'axios';

function Right_Logo_admin({ onLogout, onLogin, isLoggedIn }) {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
    const [eventName, setEventName] = useState("");
    const [messageKey, setMessageKey] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
    const handleChangePassword = () => {
        navigate("/change-password");
        setDropdownOpen(false);
    };
    const handleViewRegisteredUsers = () => {
        navigate("/view-registered-users");
        setDropdownOpen(false);
    };
    const handleAddEvent = () => {
        navigate("/create-event");
        setDropdownOpen(false);
    };
    const handleDeleteEvent = () => {
        setShowDeletePrompt(true);
        setDropdownOpen(false);
    };
    const confirmDelete = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem("adminToken");
            if (!eventName.trim()) {
                setError("Please enter an event name");
                return;
            }

            // Encode the event name for URL safety
            const encodedEventName = encodeURIComponent(eventName.trim());

            const response = await axios.delete(
                `http://localhost:5000/api/event/admin/deleteEvent/${encodedEventName}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                setSuccess("Event deleted successfully");
                setEventName("");
                setShowDeletePrompt(false);
            }
        } catch (error) {
            // Proper error handling
            const errorMessage = error.response
                ? error.response.data?.message
                : error.message;

            console.error("Delete error:", error);
            setError(errorMessage || "Failed to delete event");
            setMessageKey(prev => prev + 1);
        }
    };

    const handleUpdateEvent = () => {
        setShowUpdatePrompt(true);
        setDropdownOpen(false);
    };
    const confirmUpdateEvent = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        try {
            console.log("Fetching event details from backend...");
            const encodedEventName = encodeURIComponent(eventName.trim());

            const response = await axios.get(`http://localhost:5000/api/event/eventByName/${encodedEventName}`);

            console.log("Response from backend:", response.data);
            if (response.data.success) {
                setError('');
                setSuccess(response.data.message);
                navigate("/update-event", { state: { eventData: response.data.data } });
            } else {
                setError(response.data.message);
                setMessageKey(prevKey => prevKey + 1);
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred. Please try again.");
            setMessageKey(prevKey => prevKey + 1);
        }
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
                            width="35"
                            height="35"
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
                                    onClick={handleChangePassword}
                                    style={{
                                        padding: "12px 20px",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s",
                                        borderBottom: "1px solid #eaeaea"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f7f7f7"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                >
                                    Change Password
                                </div>
                                <div
                                    onClick={handleAddEvent}
                                    style={{
                                        padding: "12px 20px",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s",
                                        borderBottom: "1px solid #eaeaea"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f7f7f7"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                >
                                    Add Event
                                </div>
                                <div
                                    onClick={handleUpdateEvent}
                                    style={{
                                        padding: "12px 20px",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s",
                                        borderBottom: "1px solid #eaeaea"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f7f7f7"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                >
                                    Update Event
                                </div>
                                <div
                                    onClick={handleDeleteEvent}
                                    style={{
                                        padding: "12px 20px",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s",
                                        borderBottom: "1px solid #eaeaea"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f7f7f7"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                >
                                    Delete Event
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
                <button onClick={onLogin} className="logo_main_button logo_main_max-width-full logo_main_button-1 hover-button-0">
                    Login
                </button>
            )}
            <AnimatePresence>
                {showDeletePrompt && (
                    <motion.div
                        className="delete-event-modal"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "fixed",
                            top: "60%",
                            right: "2%",
                            background: "rgba(0,0,0,0.8)",
                            padding: "20px",
                            borderRadius: "12px",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                            textAlign: "center",
                            zIndex: 20,
                            width: "300px",
                        }}
                    >
                        <h3>Delete Event</h3>
                        <input
                            type="text"
                            placeholder="Enter event name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ddd",
                            }}
                        />
                        <div style={{ marginTop: "15px" }}>
                            <button
                                onClick={confirmDelete}
                                style={{
                                    backgroundColor: "#e74c3c",
                                    color: "white",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeletePrompt(false)}
                                style={{
                                    backgroundColor: "#9ACBD0",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence><AnimatePresence>
                {showUpdatePrompt && (
                    <motion.div
                        className="delete-event-modal"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "fixed",
                            top: "60%",
                            right: "2%",
                            background: "rgba(0,0,0,0.8)",
                            padding: "20px",
                            borderRadius: "12px",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                            textAlign: "center",
                            zIndex: 20,
                            width: "300px",
                        }}
                    >
                        <h3>Update Event</h3>
                        <input
                            type="text"
                            placeholder="Enter event name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ddd",
                            }}
                        />
                        <div style={{ marginTop: "15px" }}>
                            <button
                                onClick={confirmUpdateEvent}
                                style={{
                                    backgroundColor: "#e74c3c",
                                    color: "white",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setShowUpdatePrompt(false)}
                                style={{
                                    backgroundColor: "#9ACBD0",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ position: "relative" }}>
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            key={messageKey}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0 }}
                            className="login_message login_message-error forgotpassword-message"
                            style={{
                                position: "fixed",
                                bottom: "7.5%",
                                left: "40%",
                                right: "40%",
                                transform: "translateX(-50%)",
                                zIndex: 2
                            }}                            >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
                {success && (
                    <div className="login_message login_message-success forgotpassword-message" style={{
                        position: "fixed",
                        bottom: "7.5%",
                        left: "40%",
                        right: "40%",
                        transform: "translateX(-50%)",
                        zIndex: 2
                    }}>
                        {success}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Right_Logo_admin;

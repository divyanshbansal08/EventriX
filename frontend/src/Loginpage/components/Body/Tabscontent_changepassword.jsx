import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cards from "./cards";
import Button from "./button";
import { motion, AnimatePresence } from "framer-motion";
import Tabhead_changepassword from "./tabhead_changepassword";
import Subbutton from "./subbutton";

function Tabscontent_changepassword() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [messageKey, setMessageKey] = useState(0);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const navigate = useNavigate();

    // change password
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setSuccess('');
        try {
            const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
            console.log("Changing password...");
            const changePasswordResponse = await axios.post('http://localhost:5000/api/user/change-password', {
                username,
                currentPassword: password,
                newPassword,
                confirmNewPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Changed password...");
            if (changePasswordResponse.data.success) {
                console.log("Changed password... Success");
                setSuccess(changePasswordResponse.data.message);
                setError('');
                setTimeout(() => navigate("/login"), 2000);
            } else {
                console.log("Changed password... Fail");
                setError(changePasswordResponse.data.message);
                setSuccess('');
                setMessageKey(prevKey => prevKey + 1);
            }
        } catch (error) {
            console.error("Error from server:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Internal server error. Please try again.");
            setMessageKey(prevKey => prevKey + 1);
        }
    };

    return (
        <div className="signup-tab-content">
            <Tabhead_changepassword title="Change Password" />
            <div className="signup_signup-form-block">

                <form className="signup_signup-form" onSubmit={handleChangePassword}>
                    <Cards
                        key={1}
                        title="Username*"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="signup_form_field-wrapper">
                        <label className="signup_form_field-label">Current Password*</label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                className="signup_form_input signup_form_input-1"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Current Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "70%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    color: "white"
                                }}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </div>
                    <div className="signup_form_field-wrapper">
                        <label className="signup_form_field-label">New Password*</label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                className="signup_form_input signup_form_input-1"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <span
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "70%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    color: "white"
                                }}
                            >
                                {showNewPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </div>
                    <div className="signup_form_field-wrapper">
                        <label className="signup_form_field-label">Confirm New Password*</label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                className="signup_form_input signup_form_input-1"
                                type={showConfirmNewPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                            <span
                                onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "70%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    color: "white"
                                }}
                            >
                                {showConfirmNewPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </div>
                    <Subbutton value="Change Password" />
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                key={messageKey}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0 }}
                                className="login_message login_message-error"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {success && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0 }}
                                className="login_message login_message-success"
                            >
                                {success}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>

            </div>
        </div>
    );
}

export default Tabscontent_changepassword;
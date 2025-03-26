import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cards from "./cards";
import Button from "./button";
import Tabhead from "./tabhead";
import { motion, AnimatePresence } from "framer-motion";

function Tabscontent() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [messageKey, setMessageKey] = useState(0);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    // Send OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setSuccess('');
        if (password.length < 6) {
            setError('Password should be at least 6 characters long');
            setMessageKey(prevKey => prevKey + 1);
            return;
        }
        if (password !== confirmpassword) {
            setError('Passwords do not match');
            setMessageKey(prevKey => prevKey + 1);
            return;
        }

        try {
            console.log("Sending OTP request to backend...");
            const response = await axios.post('http://localhost:5000/api/otp/send-otp', {
                email,
                isForgotPassword: false
            });
            console.log("Response from backend:", response.data);
            if (response.data.success) {
                setShowOtpInput(true);
                setError('');
                setSuccess(response.data.message);
            } else {
                setError(response.data.message);
                setMessageKey(prevKey => prevKey + 1);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            setMessageKey(prevKey => prevKey + 1);
        }
    };

    // Verify OTP and Signup
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setSuccess('');
        try {
            console.log("Verifying OTP...");
            const otpResponse = await axios.post('http://localhost:5000/api/otp/verify-otp', { email, otp });
            console.log("Verified OTP...");
            if (otpResponse.data.success) {
                console.log("Verified OTP... Success");
                const signUpResponse = await axios.post('http://localhost:5000/api/auth/signin', { username, email, password });
                console.log("Verified OTP... Success... Signin");
                if (signUpResponse.data.success) {
                    console.log("Verified OTP... Success... Signin Success");
                    setSuccess('Signup successful. Redirecting to login...');
                    setTimeout(() => navigate("/login"), 2000);
                } else {
                    console.log("Verified OTP... Success... Signin Fail");
                    setError(signUpResponse.data.message);
                }
            } else {
                console.log("Verified OTP... Fail");
                setError(otpResponse.data.message);
            }
        } catch (error) {
            console.log("Verified OTP... Success... Signin Success error");
            setError('An error occurred. Please try again.');
        }
        setMessageKey(prevKey => prevKey + 1);
    };

    return (
        <div className="signup-tab-content">
            <Tabhead title="Sign Up" />
            <div className="signup_signup-form-block">
                {!showOtpInput ? (
                    <form className="signup_signup-form" onSubmit={handleSendOTP}>
                        <Cards
                            key={1}
                            title="Name*"
                            placeholder="Enter Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Cards
                            key={2}
                            title="Email*"
                            placeholder="Your email (abc@gmail.com)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="signup_form_field-wrapper">
                            <label className="signup_form_field-label">Password*</label>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    className="signup_form_input signup_form_input-1"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
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
                            <label className="signup_form_field-label">Confirm Password*</label>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    className="signup_form_input signup_form_input-1"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmpassword(e.target.value)}
                                />
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "70%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        color: "white"
                                    }}
                                >
                                    {showConfirmPassword ? "🙈" : "👁️"}
                                </span>
                            </div>
                        </div>
                        <Button />

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
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <div className="signup_form_field-wrapper-temp">
                            <Cards
                                key={5}
                                title="OTP*"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <Button />

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    key={messageKey}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0 }}
                                    className="login_message login_message-error"
                                    style={{
                                        position: "absolute",
                                        top: "-18px",
                                        left: "0",
                                        right: "0",
                                        textAlign: "center",
                                        pointerEvents: "none"
                                    }}
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
                                    style={{
                                        position: "absolute",
                                        top: "-18px",
                                        left: "0",
                                        right: "0",
                                        textAlign: "center",
                                        pointerEvents: "none"
                                    }}
                                >
                                    {success}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Tabscontent;


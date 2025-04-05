import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cards from './Body/cards';
import { motion, AnimatePresence } from "framer-motion";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [messageKey, setMessageKey] = useState(0);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/otp/send-otp', {
                email,
                isForgotPassword: true
            });
            if (response.data.success) {
                setSuccess('OTP sent to your email.');
                setShowOtpInput(true);
            } else {
                setError(response.data.message);
                setMessageKey(prevKey => prevKey + 1);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
            setMessageKey(prevKey => prevKey + 1);
            setSuccess('');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/otp/verify-otp', { email, otp });
            if (response.data.success) {
                setShowPasswordInput(true);
                setSuccess('OTP verified. Set your new password.');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
            setMessageKey(prevKey => prevKey + 1);
            setSuccess('');
        }
    };

    const handleSetNewPassword = async (e) => {
        e.preventDefault();
        setError('');
        if (newPassword.length < 6) {
            setError('Password should be atleast 6 characters long');
            setMessageKey(prevKey => prevKey + 1);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/user/reset-password', { email, newPassword });
            if (response.data.success) {
                setSuccess(response.data.message);
                setError('');
                setTimeout(() => navigate('/login'), 2000);
            }
            else {
                setError(response.data.message);
                setMessageKey(prevKey => prevKey + 1);
                setSuccess('');
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
            setMessageKey(prevKey => prevKey + 1);
            setSuccess('');
        }
    };

    return (
        <div className="forgot-password-wrapper">
            <div className="forgot-password">
                <h2>Forgot Password</h2>

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

                {!showOtpInput && (
                    <form onSubmit={handleSendOtp}>
                        <Cards
                            key={1}
                            type="text"
                            title="Enter your email*"
                            placeholder="Your email (abc@iitk.ac.in)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="signup_button signup_max-width-full signup_button-1 hover-button-0" type="submit">Send OTP</button>
                    </form>
                )}
                {showOtpInput && !showPasswordInput && (
                    <form onSubmit={handleVerifyOtp}>
                        <Cards
                            key={2}
                            type="text"
                            title="OTP*"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button className="signup_button signup_max-width-full signup_button-1 hover-button-0" type="submit">Verify OTP</button>
                    </form>
                )}
                {showPasswordInput && (
                    <div className="forgotpassword_form_field-wrapper">
                        <div className="forgotpassword_form_field-wrapper-1">
                            <label className="signup_form_field-label">Password*</label>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    className="signup_form_input signup_form_input-1"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        left: "58%",
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
                    </div>
                )}
                {showPasswordInput && (
                    <button
                        className="forgotpassword_button signup_max-width-full signup_button-1 hover-button-0"
                        type="submit"
                        onClick={handleSetNewPassword}
                    >
                        Reset Password
                    </button>
                )
                }

            </div>
        </div>
    );
}

export default ForgotPassword;



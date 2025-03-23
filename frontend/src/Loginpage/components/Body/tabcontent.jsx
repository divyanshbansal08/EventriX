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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [messageKey, setMessageKey] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccess('');

        if (password.length < 6) {
            setError('Password should be at least 6 characters long');
            setMessageKey(prevKey => prevKey + 1);
            return;
        }
        if (password !== confirmpassword) {
            setError('Password is not same');
            setMessageKey(prevKey => prevKey + 1);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', {
                username,
                email,
                password
            });

            if (response.data.success) {
                setError('');
                setSuccess(response.data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
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

    return (<div className="signup-tab-content">
        <Tabhead title="Sign Up" />
        <div className="signup_signup-form-block">
            <form className="signup_signup-form" onSubmit={handleSubmit}>

                <Cards
                    key={1}
                    title="Name*"
                    placeholder="Enter Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Cards
                    key={2}
                    title="Email / Roll Number*"
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
                            style={{ position: "absolute", 
                                right: "10px", 
                                top: "70%", 
                                transform: "translateY(-50%)", 
                                cursor: "pointer", 
                                color: "white" }}
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
                            style={{ position: "absolute", 
                                right: "10px", 
                                top: "70%", 
                                transform: "translateY(-50%)", 
                                cursor: "pointer", 
                                color: "white" }}
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
        </div>
    </div>);
}
export default Tabscontent;
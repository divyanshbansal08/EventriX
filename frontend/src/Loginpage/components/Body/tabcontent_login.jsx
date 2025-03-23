import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cards from "./cards";
import Button from "./button";
import Tabhead from "./tabhead";
import cardcontent_login from "./cardcontent_login";
import { motion, AnimatePresence } from "framer-motion";

function Tabscontent_login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [messageKey, setMessageKey] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        try {
            console.log("Sending request to backend...");
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            console.log("Response from backend:", response.data);

            if (response.data.success) {
                setSuccess(response.data.message);
                setError('');
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    window.location.href = "/home";
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

    return (
        <div className="signup-tab-content">
            <Tabhead title="Log In" />
            <div className="signup_signup-form-block">
                <form className="signup_signup-form" onSubmit={handleSubmit}>
                    {cardcontent_login.map((Carditem) => (
                        <Cards
                            key={Carditem.key}
                            title={Carditem.title}
                            placeholder={Carditem.value}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    ))}

                    <div className="password_login-wrapper">
                        <div className="password_login">
                            <div className="password_login-1">Password*</div>
                            <div
                                onClick={() => navigate("/forgotpassword")}
                                className="password_login-2"
                                style={{ cursor: "pointer", color: "white", textDecoration: "underline" }}
                            >
                                Forgot your password?
                            </div>
                        </div>
                        <div style={{ position: "relative" }}>
                            <input
                                className="signup_form_input signup_form_input-1"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ 
                                    position: "absolute", 
                                    right: "10px", 
                                    top: "50%", 
                                    transform: "translateY(-50%)", 
                                    cursor: "pointer", 
                                    color: "white"
                                }}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </div>

                    <Button />

                    <div style={{ position: "relative" }}>
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
                        {success && (
                            <div 
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
                            </div>
                        )}
                    </div>

                    <div className="noaccount_login">
                        <div
                            className="noaccount_login-1"
                            onClick={() => {
                                setError(''); 
                                navigate("/signin");
                            }}
                            style={{ cursor: "pointer", color: "white", textDecoration: "underline" }}
                        >
                            Don't have an account? Sign up
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Tabscontent_login;
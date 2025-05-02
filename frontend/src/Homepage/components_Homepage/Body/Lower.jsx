import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";

function Lower({ onSearchRedirect }) {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [messageKey, setMessageKey] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        try {
            const response = await axios.post('https://testproject-k2cs.onrender.com/api/user/search', { search });

            if (response.data.success) {
                setError('');
                setSuccess("Redirecting sucessfully...");
                setTimeout(() => {
                    onSearchRedirect?.(response.data.page);
                }, 1000);
            } else {
                setError(response.data.message);
                setMessageKey(prev => prev + 1);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            setMessageKey(prev => prev + 1);
            setSuccess('');
        }
    };

    return (
        <div className="homepage_body-lower-wrapper">
            <form className="homepage_body-lower" onSubmit={handleSubmit}>
                <input
                    className="homepage_body-lower-input homepage_body-lower-input-1 homepage_form_input"
                    type="text"
                    placeholder="Search for Clubs/Events"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input type="submit" className="homepage_body-lower-button homepage_body-lower-button-1 homepage_hover-button" />
            </form>
            <div style={{ position: "relative" }}>
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            key={messageKey}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0 }}
                            className="home_message login_message-error"
                            style={{ position: "absolute", top: "20px", left: "35%", right: "35%", textAlign: "center" }}
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
                {success && (
                    <div className="home_message login_message-success" style={{ position: "absolute", top: "20px", left: "35%", right: "35%", textAlign: "center" }}>
                        {success}
                    </div>
                )}
            </div>
        </div>
    );
}


export default Lower;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";

function Lower() {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [messageKey, setMessageKey] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        try {
            console.log("Sending request to backend...");
            const response = await axios.post('http://localhost:5000/api/user/search', {
                search
            });
            console.log("Response from backend:", response.data);

            if (response.data.success) {
                setSuccess(response.data.message);
                setError('');
                setTimeout(() => {
                    navigate("/" + response.data.page);
                }, 2000);
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
        <div className="homepage_body-lower-wrapper">
            <form className="homepage_body-lower" onSubmit={handleSubmit}>
                <input
                    className="homepage_body-lower-input homepage_body-lower-input-1 homepage_form_input"
                    type="text"
                    placeholder="Search"
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
                            className="login_message login_message-error"
                            style={{ position: "absolute", top: "20px", left: "35%", right: "35%", textAlign: "center" }}
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
                {success && (
                    <div className="login_message login_message-success" style={{ position: "absolute", top: "20px", left: "35%", right: "35%", textAlign: "center" }}>
                        {success}
                    </div>
                )}
            </div>
        </div>
    );
}
export default Lower;
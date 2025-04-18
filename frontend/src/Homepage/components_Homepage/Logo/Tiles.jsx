import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Tiles(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === props.navigate;

    return (
        <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <a 
                onClick={() => navigate(props.navigate)} 
                style={{ 
                    cursor: "pointer", 
                    color: "white", 
                    textDecoration: "none",
                    position: "relative",
                    padding: "0.5rem 1rem",
                    display: "inline-block"
                }} 
                className="homepage_tiles"
            >
                {props.content}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        layoutId="navbar-box"
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                    />
                )}
                {!isActive && (
                    <motion.div
                        className="absolute inset-0 bg-white/5 rounded-lg opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </a>
        </motion.div>
    );
}

export default Tiles;
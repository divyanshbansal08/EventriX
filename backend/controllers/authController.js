import { hashPassword, comparePasswords } from '../services/userService.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const emailRegex = /^[a-zA-Z0-9._%+-]+@iitk\.ac\.in$/;

// Login
export const logIN = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Received data:", req.body);
        if (!email) {
            return res.status(400).json({ message: "Enter email." });
        }
        if (!password) {
            return res.status(400).json({ message: "Enter password." });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Only @iitk.ac.in emails are allowed" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "User does not exist" });

        if (!user.verified) {
            return res.status(400).json({ message: "Please verify your email before logging in." });
        }
        const isPasswordValid = await comparePasswords(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ email: user.email, username: user.username }, jwtSecret, { expiresIn: '1h' });
            res.json({ success: true, token, message: "Login successful" });
        } else {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Signup
export const signIN = async (req, res) => {
    try {
        console.log("Signing in...");
        const { username, email, password } = req.body;

        if (!username) {
            console.log("Enter username.");
            return res.status(400).json({ success: false, message: "Enter username." });
        }
        if (!email) {
            console.log("Enter email.");
            return res.status(400).json({ success: false, message: "Enter email." });
        }
        if (!password) {
            console.log("Enter password.");
            return res.status(400).json({ success: false, message: "Enter password." });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Only @iitk.ac.in emails are allowed" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found. Please verify OTP first." });
        }

        if (!user.verified) {
            return res.status(400).json({ success: false, message: "Please verify your OTP before signing up." });
        }

        const hashedPassword = await hashPassword(password);
        user.username = username;
        user.password = hashedPassword;

        await user.save();

        console.log("Signup successful.");
        res.json({ success: true, message: "Signup successful" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
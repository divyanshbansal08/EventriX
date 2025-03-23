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

        // Validate email domain
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Only @iitk.ac.in emails are allowed" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        console.log(user);

        // Compare hashed password
        const isPasswordValid = await comparePasswords(password, user.password);
        if (isPasswordValid) {
            // Generate JWT token
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
        const { username, email, password } = req.body;

        if (!username) return res.status(400).json({ success: false, message: "Enter username." });
        if (!email) return res.status(400).json({ success: false, message: "Enter email." });
        if (!password) return res.status(400).json({ success: false, message: "Enter password." });

        // Validate email domain
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Only @iitk.ac.in emails are allowed" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password should be at least 6 characters long" });
        }

        // Check for duplicate username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: "Username already taken. Choose a different one." });
        }

        // Check for duplicate email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        res.json({ success: true, message: "Signup successful" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

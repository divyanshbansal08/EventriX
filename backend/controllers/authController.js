import { hashPassword, comparePasswords } from '../services/userService.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

// Login

export const logIN = async (req, res) => {
    const { email, password } = req.body;
    console.log("Received data:", req.body);

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
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token, message: "Login successful" });
    } else {
        res.status(400).json({ success: false, message: "Invalid credentials" });
    }
};


// Signin

export const signIN = async (req, res) => {
    const { username, email, password } = req.body;

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

    res.json({ success: true, message: "Signup successful." });
};
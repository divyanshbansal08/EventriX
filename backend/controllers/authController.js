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
    if (!username) {
        return res.status(400).json({ success: false, message: "Enter username." });
    }
    if (!email) {
        return res.status(400).json({ success: false, message: "Enter email." });
    }
    if (!password) {
        return res.status(400).json({ success: false, message: "Enter password." });
    }

    const user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password should be at least 6 characters long" });
    }

    const hashedPassword = await hashPassword(password);

    // Creating new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "Signup successful" });
};

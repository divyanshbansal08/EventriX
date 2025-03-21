import { users, hashPassword, comparePasswords } from '../services/userService.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
// Login

export const logIN = async (req, res) => {
    const { username, password } = req.body;
    console.log("Received data:", req.body);

    // Find user by username only (NOT password)
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Compare hashed password
    const isPasswordValid = await comparePasswords(password, user.password);
    if (isPasswordValid) {
        // Generate JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token, message: "Login successful" });
    } else {
        res.status(400).json({ success: false, message: "Invalid credentials" });
    }
};


// Signin

export const signIN = async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password should be at least 6 characters long" });
    }

    const hashedPassword = await hashPassword(password);
    users.push({ username, email, password: hashedPassword });
    res.json({ success: true, message: "Signup successful" });
};

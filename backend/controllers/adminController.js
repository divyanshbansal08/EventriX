import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Login Admin
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(404).json({ success: false, message: 'Enter email' });
    }
    if (!password) {
        return res.status(404).json({ success: false, message: 'Enter password' });
    }
    try {
        const admin = await Admin.findOne({ email: email.toLowerCase() });

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { email: admin.email, clubID: admin.clubID, clubName: admin.clubName, isAdmin: true },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ success: true, token, message: 'Admin login successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

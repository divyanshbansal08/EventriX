import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const users = [{ username: 'testuser', email: 'testuser@email.com', password: 'testpass' }];

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    console.log("Received data:", req.body);
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.status(400).json({ success: false, message: "Invalid credentials" });
    }
});

app.post("/api/signin", (req, res) => {
    const { username, email, password } = req.body;
    console.log("Received data:", req.body);

    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        res.status(400).json({ success: false, success_password: true, message: "User already exists" });
    } else if (password.length < 6) {
        res.status(400).json({ success: false, success_password: false, message: "Password should be at least 6 characters long" });
    } else {
        users.push({ username, email, password });
        res.json({ success: true, success_password: true, message: "Signup successful" });
    }
    console.log(users);
});

const otpStore = {};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const otp = generateOTP();
    const expiry = Date.now() + 5 * 60 * 1000;

    otpStore[email] = { otp, expiry };

    console.log(`Generated OTP for ${email}: ${otp}`);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shaikjameelurrahaman@gmail.com',
            pass: 'axyg uxjf enun vawn'
        }
    });

    const mailOptions = {
        from: 'shaikjameelurrahaman@gmail.com',
        to: email,
        subject: 'OTP for Password Reset',
        text: `Your OTP for password reset is: ${otp}`
    };

    try {
        await transporter.sendMail({
            from: 'shaikjameelurrahaman@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is: ${otp}`
        });
        console.log(`OTP sent to ${email}: ${otp}`);
        res.json({ success: true, message: 'OTP sent to your email.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
});

app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    const data = otpStore[email];

    if (!data) {
        return res.status(400).json({ success: false, message: 'No OTP found for this email.' });
    }

    if (Date.now() > data.expiry) {
        delete otpStore[email];
        return res.status(400).json({ success: false, message: 'OTP has expired.' });
    }

    if (otp !== data.otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
    }

    delete otpStore[email];

    res.json({ success: true, message: 'OTP verified successfully. Proceed to reset your password.' });
});

app.post('/api/reset-password', (req, res) => {
    const { email, newPassword } = req.body;

    const user = users.find(user => user.email === email && user.password === newPassword);

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (user) {
        return res.status(400).json({ success: false, message: 'Password in use' });
    }

    res.json({ success: true, message: 'Password reset successful' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

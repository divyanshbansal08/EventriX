import { sendMail } from '../services/mailService.js';
import generateOTP from '../utils/generateOTP.js';
const otpStore = {};

// Send OTP
export const sendOTP = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

    const otp = generateOTP();
    const expiry = Date.now() + 5 * 60 * 1000;
    otpStore[email] = { otp, expiry };

    try {
        await sendMail(email, otp);
        res.json({ success: true, message: 'OTP sent to your email.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error sending OTP.' });
    }
};

// verify otp

export const verifyOTP = async (req, res) => {
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
};
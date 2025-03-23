import { sendMail } from '../services/mailService.js';
import generateOTP from '../utils/generateOTP.js';
import User from '../models/User.js';

// Send OTP
export const sendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        const otp = generateOTP();
        const otpExpiry = Date.now() + 5 * 60 * 1000;
        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await sendMail(email, otp);
        await user.save();
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

    try {
        const user = await User.findOne({ email });

        if (!user || !user.otp || !user.otpExpiry) {
            return res.status(400).json({ success: false, message: 'No OTP found for this email.' });
        }

        if (Date.now() > user.otpExpiry) {
            user.otp = null;
            user.otpExpiry = null;
            await user.save();
            return res.status(400).json({ success: false, message: 'OTP has expired.' });
        }

        if (otp !== user.otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
        }

        //Clear OTP from the database
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.json({ success: true, message: 'OTP verified successfully. Proceed to reset your password.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error verifying OTP.' });
    }
};

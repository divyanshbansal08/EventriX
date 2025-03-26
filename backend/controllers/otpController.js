import { sendMail } from '../services/mailService.js';
import generateOTP from '../utils/generateOTP.js';
import User from '../models/User.js';

// Send OTP
export const sendOTP = async (req, res) => {
    const { email, isForgotPassword } = req.body;

    if (!email) {
        console.log(`OTP sent successfully0 to ${email}`);
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    try {
        const user = await User.findOne({ email });

        if (!isForgotPassword && user && user.verified) {
            console.log(`OTP sent successfully1 to ${email}`);

            return res.status(400).json({ success: false, message: 'User is already verified.' });
        }

        const otp = generateOTP();
        const otpExpiry = Date.now() + 5 * 60 * 1000;

        if (user) {
            console.log(`OTP sent successfully2 to ${email}`);

            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();
        } else {
            console.log(`OTP sent successfully3 to ${email}`);

            const newUser = new User({ email, otp, otpExpiry });
            await newUser.save();
        }

        await sendMail(email, otp);
        console.log(`OTP sent successfully4 to ${email}`);
        res.json({ success: true, message: 'OTP sent to your email.' });
    } catch (error) {
        console.error('Error in sending OTP:', error);
        res.status(500).json({ success: false, message: 'Error sending OTP.' });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    console.log("Verifying OTP...");
    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found....");
            return res.status(400).json({ success: false, message: 'User not found.' });
        }

        if (Date.now() > user.otpExpiry) {
            console.log("OTP has expired...");
            return res.status(400).json({ success: false, message: 'OTP has expired.' });
        }

        if (user.otp !== otp) {
            console.log("Invalid OTP. Please try again.");
            return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
        }

        user.verified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        console.log("OTP verified successfully. Proceed to signin..");
        res.json({ success: true, message: 'OTP verified successfully. Proceed to signin.' });
    } catch (error) {
        console.log("Error verifying OTP.");
        res.status(500).json({ success: false, message: 'Error verifying OTP.' });
    }
};

import User from "../models/User.js";
import { hashPassword } from "../services/userService.js";

// reset password

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    const hashedPassword = await hashPassword(newPassword);

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (user.password === newPassword) {
        return res.status(400).json({ success: false, message: 'Password in use' });
    }
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password reset successful' });
};


// search function

export const search = async (req, res) => {
    const { search } = req.body;
    console.log("Received data:", req.body);

    if (!search) return res.status(400).json({ success: false, page: '', message: 'Enter a query.' });

    const validSearchTerms = ['home', 'login', 'signin', 'councils'];

    if (validSearchTerms.includes(search.toLowerCase())) {
        res.json({ success: true, page: search.toLowerCase(), message: 'Search successful, redirecting...' });
    }
    else {
        res.status(400).json({ success: false, page: 'does not exist', message: 'Query does not exist.' });
    }
};
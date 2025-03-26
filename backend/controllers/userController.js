import Admin from "../models/Admin.js";
import User from "../models/User.js";
import { comparePasswords, hashPassword } from "../services/userService.js";

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

// change password
export const changePassword = async (req, res) => {

    try {
        console.log("Changing password...");

        const { username, currentPassword, newPassword, confirmNewPassword } = req.body;
        console.log(req.body);
        if (!username) {
            console.log("Enter username");
            return res.status(400).json({ success: false, message: "Enter username" });
        }
        if (!currentPassword) {
            console.log("Enter currentPassword");
            return res.status(400).json({ success: false, message: "Enter current password" });
        }
        if (!newPassword) {
            console.log("Enter newPassword");
            return res.status(400).json({ success: false, message: "Enter new password" });
        }
        if (!confirmNewPassword) {
            console.log("Enter confirmNewPassword");
            return res.status(400).json({ success: false, message: "Enter confirm new password" });
        }
        if (newPassword !== confirmNewPassword) {
            console.log("New password is not same");
            return res.status(400).json({ success: false, message: "New password is not same" });
        }
        let user = await User.findOne({ username });
        let isAdmin = false;

        if (!user) {
            user = await Admin.findOne({ username });
            isAdmin = true;
        }

        if (!user) {
            console.log("User not found.");
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const isMatch = await comparePasswords(currentPassword, user.password);
        if (!isMatch) {
            console.log("Current password is incorrect");
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
        }

        console.log(user);
        const newHashedPassword = await hashPassword(newPassword);
        user.password = newHashedPassword;
        await user.save();

        console.log("Changed password successfully");
        return res.json({ success: true, message: "Changed password successfully" });
    } catch (error) {
        console.log("Some error has occured");
        return res.status(500).json({ success: false, message: "Some error has occured" });
    }
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
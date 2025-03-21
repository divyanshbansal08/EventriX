import { users } from "../services/userService.js";

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    const user = users.find(user => user.email === email && user.password === newPassword);

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (user) {
        return res.status(400).json({ success: false, message: 'Password in use' });
    }

    res.json({ success: true, message: 'Password reset successful' });
};

export default resetPassword;
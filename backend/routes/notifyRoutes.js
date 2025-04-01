import express from "express";
const router = express.Router();
import Event from "../models/events.models.js";
// import User from "../models/users.models.js";

const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    next();
};

router.post("/notify", isAuthenticated, async (req, res) => {
    const { eventId } = req.body;
    const userId = req.user._id; 
    try {
        const event = await Event.findById(eventId);
        const user = await User.findById(userId);

        if (!event || !user) {
            return res.status(404).json({ message: "Event or User not found" });
        }
        if (!event.registeredUsers.user_id.includes(userId)) {
            event.registeredUsers.user_id.push(userId);
            await event.save();
        }
        res.status(200).json({ message: "You will be notified before the event starts!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
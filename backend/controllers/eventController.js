import Event from "../models/Event.js";
import { sendMail } from "../services/mailService.js"; // Import sendMail function
import jwt from "jsonwebtoken"; // Import JWT

// Create Event
export const makeEvent = async (req, res) => {
    const { eventName, eventDescription, eventPic, eventVenue, eventDate } = req.body;
    if (!eventName || !eventDescription || !eventPic || !eventVenue || !eventDate) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    try {
        const newEvent = new Event({ eventName, eventDescription, eventPic, eventVenue, eventDate });
        await newEvent.save();
        res.json({ success: true, message: "Event created successfully", eventId: newEvent._id });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating event.' });
    }
};

// Register for an Event (Token-based)
export const registerEvent = async (req, res) => {
    try {
        const { eventId } = req.body;

        if (!eventId) {
            return res.status(400).json({ success: false, message: "Event ID is required." });
        }

        // Extract user email from JWT token
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(403).json({ success: false, message: "No token provided." });
        }

        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        const email = decoded.email; // Extract email from token payload

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found." });
        }

        // Check if user is already registered
        if (event.registeredUsers.some(user => user.email === email)) {
            return res.status(400).json({ success: false, message: "User already registered." });
        }

        // Register user
        event.registeredUsers.push({ email });
        await event.save();

        // Send confirmation email
        await sendMail(email, `You have successfully registered for ${event.eventName} on ${event.eventDate}`);

        res.json({ success: true, message: "Registered successfully and email sent." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error registering for event." });
    }
};

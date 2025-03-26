import Event from "../models/Event.js";
import { sendMail } from "../services/mailService.js";
import jwt from "jsonwebtoken";

// Create Event
export const makeEvent = async (req, res) => {
    const { eventName, eventDescription, eventPic, eventVenue, eventDate } = req.body;
    if (!eventName || !eventDescription || !eventPic || !eventVenue || !eventDate) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }
    try {
        const newEvent = new Event({ eventName, eventDescription, eventPic, eventVenue, eventDate });
        await newEvent.save();
        res.json({ success: true, message: "Event created successfully", eventId: newEvent._id });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating event." });
    }
};

// Register for an Event (Auto-detect Event)
export const registerEvent = async (req, res) => {
    try {
        // Extract and verify the user's token automatically
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Please log in first." });
        }

        try {
            const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const email = decoded.email; // Extract user email from token payload

            // Get the event ID from the request params (Assuming frontend sends event ID in URL)
            const eventId = req.params.eventId;
            if (!eventId) {
                return res.status(400).json({ success: false, message: "Event ID is required." });
            }

            // Find the event by ID
            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json({ success: false, message: "Event not found." });
            }

            // Check if the user is already registered
            if (event.registeredUsers.some(user => user.email === email)) {
                return res.status(400).json({ success: false, message: "You are already registered for this event." });
            }

            // Register the user
            event.registeredUsers.push({ email });
            await event.save();

            // Send confirmation email
            await sendMail(email, `You have successfully registered for ${event.eventName} on ${event.eventDate}`);

            res.json({ success: true, message: `Registered successfully for event: ${event.eventName}` });
        } catch (error) {
            return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error registering for event." });
    }
};

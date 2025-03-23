import Event from "../models/Event.js";

// Make event

export const makeEvent = async (req, res) => {
    const { eventName, eventDescription, eventPic, eventVenue, eventDate } = req.body;
    if (!eventName) {
        return res.status(400).json({ success: false, message: 'Enter event name.' });
    }
    if (!eventDescription) {
        return res.status(400).json({ success: false, message: 'Enter event description.' });
    }
    if (!eventPic) {
        return res.status(400).json({ success: false, message: 'Need event pic.' });
    }
    if (!eventVenue) {
        return res.status(400).json({ success: false, message: 'Enter event venue.' });
    }
    if (!eventDate) {
        return res.status(400).json({ success: false, message: 'Enter event date.' });
    }
    try {
        const newEvent = new Event({ eventName, eventDescription, eventPic, eventVenue, eventDate });
        await newEvent.save();
        res.json({ success: true, message: "Event created successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating event.' });
    }

};

// register event


export const registerEvent = async (req, res) => {
    const { email, eventId } = req.body;

    if (!email || !eventId) {
        return res.status(400).json({ success: false, message: 'Email and event ID are required.' });
    }

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found.' });
        }

        event.registeredUsers.push({ email });
        await event.save();

        await sendMail(email, `You have successfully registered for ${event.eventName} on ${event.eventDate}`);

        res.json({ success: true, message: 'Registered successfully and email sent.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering for event.' });
    }
};
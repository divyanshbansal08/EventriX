import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true, unique: true },
    eventDescription: { type: String, required: true },
    eventPic: { type: String, required: true },
    eventVenue: { type: String, required: true },
    eventDate: { type: Date, required: true, index: true },

    registeredUsers: [{
        email: { type: String, required: true },
        registeredAt: { type: Date, default: Date.now },
        regustered: { type: Boolean }
    }]
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
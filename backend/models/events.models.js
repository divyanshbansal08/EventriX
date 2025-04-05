import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    clubName: {
        type: String
    },
    councilName: {
        type: String
    },
    eventName: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Upcoming", "Ongoing"]
    },
    coverImage: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    clubID: {
        type: String,
        ref: "Admin"
    },
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    notifiedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

}, { timestamp: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;
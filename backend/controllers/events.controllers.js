import mongoose from 'mongoose';
import Event from '../models/events.models.js';
// import Admin from '../models/admin.models.js';
import { eventSchema } from '../models/events.zod.js';
import { z } from 'zod';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { deleteFromCloudinary } from '../utils/cloudinary.js';
import jwt from "jsonwebtoken";
import moment from "moment";


export const getEvent = async (req, res) => {
    try {
        const now = moment().utc(+5.5);

        let filter = {};

        if (req.params.councilName) {
            filter.councilName = req.params.councilName;
        } else if (req.params.clubID) {
            filter.clubID = req.params.clubID;
        } else if (req.params.id) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(404).send(`No event with id: ${req.params.id}`);
            }
            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json(new ApiResponse(404, "No such event found."));
            }
            return res.status(200).json(new ApiResponse(200, "Event fetched successfully.", event));
        }

        // Filter out past events
        filter.$expr = {
            $gt: [
                {
                    $dateFromString: {
                        dateString: {
                            $concat: [
                                { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                                "T",
                                "$time",
                                ":00.000Z"
                            ],
                        },
                    },
                },
                now.toDate(),
            ],
        };

        const events = await Event.find(filter);

        if (events.length > 0) {
            return res.status(200).json(new ApiResponse(200, "Events fetched successfully.", events));
        } else {
            return res.status(404).json(new ApiResponse(404, "No upcoming events found."));
        }
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "Something went wrong while fetching events."));
    }
};



export const createEvent = async (req, res) => {
    try {
        console.log("Received request:", req.body);
        console.log("Received file:", req.file);

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        const { clubID, clubName } = decoded;
        console.log("Decoded Token:", decoded);

        const { eventName, time, description, date, location } = req.body;

        if (!eventName || !description || !date || !location) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        let coverImageData = {};

        if (req.file) {
            const uploadResponse = await uploadOnCloudinary(req.file.path);

            if (uploadResponse) {
                coverImageData = {
                    public_id: uploadResponse.public_id,
                    url: uploadResponse.secure_url
                };
            }
        }

        const event = new Event({
            eventName: eventName,
            short_description: description,
            description: description,
            clubName: clubName,
            status: "Upcoming",
            time: time,
            date: new Date(date),
            location: location,
            clubID: clubID.toString(),
            coverImage: coverImageData
        });

        await event.save();
        res.status(201).json({ success: true, message: "Event created successfully", event });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};


export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    console.log("Incoming Delete Request for:", id);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const { clubID } = decoded;

    try {
        let event;
        event = await Event.findOne({ eventName: id });


        if (!event) {
            return res.status(404).json({ success: false, message: "No such event found." });
        }

        if (event.clubID.toString() !== clubID) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this event." });
        }

        if (event.coverImage?.public_id) {
            await deleteFromCloudinary(event.coverImage.public_id);
        }

        await Event.findByIdAndDelete(event._id);

        return res.status(200).json({ success: true, message: "Event deleted successfully." });
    } catch (error) {
        console.error("Error deleting event:", error);
        return res.status(500).json({ success: false, message: "Something went wrong while deleting the event." });
    }
};



export const updateEvent = async (req, res) => {
    const { id } = req.params;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const { clubID } = decoded;

    try {

        const event = mongoose.Types.ObjectId.isValid(id)
            ? await Event.findById(id)
            : await Event.findOne({ eventName: id });

        if (!event) {
            return res.status(404).json(new ApiResponse(404, "No such event found."));
        }
        if (event.clubID.toString() !== clubID) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this event." });
        }
        let coverImg = event.coverImage;
        if (req.file) {
            if (event.coverImage && event.coverImage.public_id) {
                await deleteFromCloudinary(event.coverImage.public_id);
            }
            const uploadedImage = await uploadOnCloudinary(req.file.path);
            coverImg = {
                public_id: uploadedImage.public_id,
                url: uploadedImage.url,
            };
        }
        console.log("type : ", typeof (req.body.eventName), "Value : ", req.body.eventName);
        console.log("type : ", typeof (req.body.description), "Value : ", req.body.description);
        console.log("type : ", typeof (new Date(req.body.date)), "Value : ", new Date(req.body.date));
        console.log("type : ", typeof (req.body.time), "Value : ", req.body.time);
        console.log("type : ", typeof (req.body.location), "Value : ", req.body.location);

        const validatedData = eventSchema.parse(
            {
                eventName: req.body.eventName,
                short_description: req.body.description,
                description: req.body.description,
                date: new Date(req.body.date),
                time: req.body.time,
                location: req.body.location,
                status: "Ongoing"
            }
        );
        console.log(validatedData);

        const updatedEvent = await Event.findByIdAndUpdate(
            event._id,
            { ...validatedData, coverImage: coverImg },
            { new: true, runValidators: true }
        );

        const newEvent = await Event.findByIdAndUpdate(event._id, updatedEvent, { new: true });

        res.status(200).json(new ApiResponse(200, "Event updated successfully.", newEvent));
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json(new ApiResponse(400, error.errors));
        } else {
            console.log(error);
            res.status(500).json(new ApiResponse(500, "Something went wrong while updating event."));
        }
    }
};

export const getEventByName = async (req, res) => {
    try {
        const eventName = req.params.eventName;

        const now = moment().utc(+5.5);

        let filter = {};

        filter.eventName = req.params.eventName;

        filter.$expr = {
            $gt: [
                {
                    $dateFromString: {
                        dateString: {
                            $concat: [
                                { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                                "T",
                                "$time",
                                ":00.000Z"
                            ],
                        },
                    },
                },
                now.toDate(),
            ],
        };

        const events = await Event.find(filter);

        if (eventName) {
            console.log(eventName);
            if (events.length > 0) {
                return res.status(200).json(new ApiResponse(200, "Events fetched successfully.", events));
            } else {
                return res.status(404).json(new ApiResponse(404, "No event with this name."));
            }
        }

    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "Something went wrong while fetching events."));
    }
}

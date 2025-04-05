import Admin from "../models/Admin.js";
import User from "../models/User.js";
import { comparePasswords, hashPassword } from "../services/userService.js";
import councilClubsData from "../data1/councilClubs.js";
import Event from "../models/events.models.js";
import moment from "moment";
import jwt from "jsonwebtoken";

// reset password

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ success: false, message: 'Password should be at least 6 characters long.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ success: true, message: 'Password reset successful.' });
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
        if (newPassword.length < 6) {
            console.log("Password should be at least 6 characters long");
            return res.status(400).json({ success: false, message: "Password should be at least 6 characters long" });
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

export const search = async (req, res) => {
    const { search } = req.body;
    console.log("Received data:", req.body);

    if (!search) {
        return res.status(400).json({ success: false, page: '', message: 'Enter a query.' });
    }

    let foundClub = null;
    for (const council of councilClubsData) {
        foundClub = council.clubs.find(club =>
            club.name.toLowerCase() === search.toLowerCase()
        );
        if (foundClub) break;
    }

    if (foundClub) {
        return res.json({
            success: true,
            page: foundClub.link,
            message: 'Search successful, redirecting to club page...'
        });
    }

    try {
        const now = moment().utc();

        let filter = {
            eventName: search,
            $expr: {
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
            }
        };

        const events = await Event.find(filter);

        if (events.length > 0) {
            return res.json({
                success: true,
                page: `/event/${events[0]._id}`,
                message: 'Search successful, redirecting to event page...'
            });
        }
    } catch (error) {
        console.error("Error searching for event:", error);
        return res.status(500).json({ success: false, page: '', message: 'Something went wrong while searching.' });
    }
    return res.status(404).json({ success: false, page: '', message: 'Query does not exist.' });
};

export const favourites = async (req, res) => {
    const { clubID } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        const { email } = decoded;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.clubs.includes(clubID)) {
            return res.status(400).json({ success: false, message: "Already subscribed to this club" });
        }

        user.clubs.push(clubID);
        await user.save();

        return res.json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
        console.error("Error in subscription:", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export const fetch_favourites = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const { email } = decoded;
    const user = await User.findOne({ email });

    if (!user || !user.clubs) {
        console.log("User has no subscribed clubs");
        return res.status(404).json({ message: "No subscribed clubs found" });
    }

    const clubIDs = user.clubs.map(c => c.toString());
    console.log("User's subscribed club IDs:", clubIDs);

    const now = moment().utc(+5.5);

    let filter = {
        clubID: { $in: clubIDs },
        $expr: {
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
        }
    };

    const events = await Event.find(filter);

    if (events.length === 0) {
        return res.json({ success: true, message: "No upcoming events found for subscribed clubs", events: [] });
    }

    res.json({ success: true, events });
};

export const notifyEvent = async (req, res) => {
    const { _id } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        const { email } = decoded;
        const user = await User.findOne({ email });
        const event = await Event.findOne({ _id });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (event.registeredUsers.includes(user._id)) {
            console.log("Already Kept as Reminder");

            return res.status(400).json({ success: false, message: "Already Kept as Reminder" });
        }

        event.registeredUsers.push(user._id);
        await event.save();
        console.log("Kept Reminder successfully");
        return res.json({ success: true, message: "Kept Reminder successfully" });
    } catch (error) {
        console.error("Error in Notification:", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}
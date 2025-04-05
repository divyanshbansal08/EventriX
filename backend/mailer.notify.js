import cron from "node-cron";
import Event from "./models/events.models.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const sendEmail = async (email, event) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Reminder: ${event.eventName} is starting soon!`,
        text: `Hello,\n\nThis is a reminder that the event "${event.eventName}" is starting at ${event.time} on ${new Date(event.date).toDateString()}.\n\nDon't miss it!`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Reminder sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
};

const startNotify = () => {
    cron.schedule("* * * * *", async () => {
        console.log("Checking for events to notify...");

        const now = new Date();
        const notifyTime = new Date(now.getTime() + 30 * 60000);

        const events = await Event.find({ status: "Upcoming" }).populate("registeredUsers");

        for (const event of events) {
            const [hours, minutes] = event.time.split(":").map(Number);
            const eventDateTime = new Date(event.date);
            eventDateTime.setHours(hours);
            eventDateTime.setMinutes(minutes);
            eventDateTime.setSeconds(0);
            eventDateTime.setMilliseconds(0);

            if (eventDateTime > now && eventDateTime <= notifyTime) {
                for (const user of event.registeredUsers) {
                    if (!event.notifiedUsers.includes(user._id)) {
                        await sendEmail(user.email, event);
                        event.notifiedUsers.push(user._id);
                    }
                }
                await event.save();
            }
        }
    });

};

export default startNotify;


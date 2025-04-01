import nodemailer from "nodemailer";
import cron from "node-cron";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,  
        pass: process.env.PASSWORD 
    }
});

const sendEmail = async (email, event) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Reminder: ${event.name} is starting soon!`,
        text: `Hello, \n\nThis is a reminder that the event "${event.name}" is starting at ${event.date}.\n\nDon't miss it!`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Reminder sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
};

cron.schedule("* * * * *", async () => {
    console.log("Checking for events to notify...");

    const now = new Date();
    const notifyTime = new Date(now.getTime() + 30 * 60000); //the user will receive the email 30 minutes before the event starts

    const events = await Event.find({ date: { $lte: notifyTime, $gt: now } }).populate("registeredUsers.user_id");

    for (const event of events) {
        for (const user of event.registeredUsers) {
            if (!user.notified) {
                await sendEmail(user.user_id.email, event);
                user.notified = true;
            }
        }
        await event.save(); 
    }
});

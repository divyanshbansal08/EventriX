import cron from 'node-cron';
import Event from '../models/Event.js';
import { sendMail } from './mailService.js';

const upcomingEventNotify = async () => {
    console.log('running a task every hour');
    try {
        const currentDate = new Date();
        const upcomingEvents = await Event.find({
            eventDate: {
                $gte: currentDate,
                $lt: new Date(currentDate.getTime() + 60 * 60 * 1000)
            }
        });
        for (const Event of upcomingEvents) {
            for (const user of Event.registeredUsers) {
                await sendMail(user.email, `Reminder: Your registered event "${Event.eventName}" is on ${Event.eventDate.toLocaleString()}`);
            }
        }
        console.log('Upcoming event notifications sent successfully.');
    } catch (error) {
        console.log('Error sending event notifications:');
    }
};

cron.schedule('0 * * * *', upcomingEventNotify);
console.log('Upcoming event notification service started');
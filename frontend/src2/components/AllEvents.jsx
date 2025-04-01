import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React from "react";
import { getEvents } from "../api/events";

export const AllEvents = () => {
    const { data: events = [], isLoading, isError, error } = useQuery({
        queryKey: ["events"],
        queryFn: getEvents,
        staleTime: 1000 * 60 * 5,
    });

    const formatDate = (dateString) => {
        const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
        return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateString));
    };

    if (isLoading) {
        return (
            <section className="py-10 px-5 font-poppins bg-black text-white">
                <h1 className="text-4xl font-semibold text-center mb-10">Featured Events</h1>
                <div className="text-center text-gray-400">Loading events...</div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-10 px-5 font-poppins bg-black text-white">
                <h1 className="text-4xl font-semibold text-center mb-10">Featured Events</h1>
                <div className="text-center text-red-400">{error.message}</div>
            </section>
        );
    }

    // Check if 'events' is an array before trying to map over it
    if (!Array.isArray(events)) {
        return (
            <section className="py-10 px-5 font-poppins bg-black text-white">
                <h1 className="text-4xl font-semibold text-center mb-10">Featured Events</h1>
                <div className="text-center text-red-400">Something went wrong with loading events.</div>
            </section>
        );
    }

    return (
        <section className="py-10 px-5 font-poppins bg-black text-white">
            <h1 className="text-4xl font-semibold text-center mb-10">Featured Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <motion.a
                        key={event._id}
                        href={`/event/${event._id}`}
                        className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img src={event.coverImage.url} alt={event.name} className="w-full h-48 object-cover" />
                        <div className="p-5">
                            <span className="block text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full mb-2">
                                {formatDate(event.date)} | {event.location}
                            </span>
                            <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                            <p className="text-gray-400 text-sm mb-4">{event.short_description}</p>
                            <span className="text-blue-400 font-medium hover:underline">View event →</span>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
};



// const eventData = [
//     {
//         id: 1,
//         title: "Musical Extravaganza",
//         date: "Fri 09 Feb 2024",
//         venue: "OAT",
//         description: "A lively celebration of music, with unforgettable melodies and energy.",
//         image: "images/musical.jpg",
//         link: "musical-extravaganza.html"
//     },
//     {
//         id: 2,
//         title: "Cricket Championship",
//         date: "Sat 10 Feb 2024",
//         venue: "Phatta Ground",
//         description: "An intense cricket battle between top teams.",
//         image: "images/cricket.jpg",
//         link: "cricket-championship.html"
//     },
//     {
//         id: 3,
//         title: "Fresher's Hackathon",
//         date: "Sun 11 Feb 2024",
//         venue: "I-7",
//         description: "A hackathon for freshers to innovate, collaborate, and showcase their coding skills.",
//         image: "images/hackathon.jpg",
//         link: "hackathon.html"
//     },
//     {
//         id: 4,
//         title: "Content Creator's Conclave",
//         date: "Tue 25 January",
//         venue: "L20",
//         description: "Creators gather to collaborate, innovate, and elevate digital content together.",
//         image: "images/content.jpg",
//         link: "content-creators.html"
//     },
//     {
//         id: 5,
//         title: "IITKPD'25",
//         date: "Sat 9th March",
//         venue: "LHB",
//         description: "Engage in insightful discussions, sharpen skills, and voice your opinions!",
//         image: "images/iitkpd.jpg",
//         link: "iitkpd.html"
//     },
//     {
//         id: 6,
//         title: "Dandiya Night",
//         date: "Mon 4th October",
//         venue: "Hall 6",
//         description: "Celebrate tradition, dance the night away, and embrace the vibrant energy at Dandiya Night!",
//         image: "images/dandiya.jpg",
//         link: "dandiya.html"
//     }
// ];

// export default function AllEvents() {
//     return (
//         <section className="max-w-6xl mx-auto py-10 px-5">
//             <h1 className="text-3xl font-bold text-center mb-10">Featured Events</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {events.map(event => (
//                     <motion.a
//                         key={event.id}
//                         href={event.link}
//                         className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         whileHover={{ scale: 1.02 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                     >
//                         <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
//                         <div className="p-5">
//                             <span className="block text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full mb-2">{event.date} | {event.venue}</span>
//                             <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
//                             <p className="text-gray-400 text-sm mb-4">{event.description}</p>
//                             <span className="text-blue-400 font-medium">View event →</span>
//                         </div>
//                     </motion.a>
//                 ))}
//             </div>
//         </section>
//     );
// }



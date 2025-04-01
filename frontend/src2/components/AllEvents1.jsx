import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getEvents } from "../api/events";

export const AllEvents = () => {
    const { data: events = [], isLoading, isError, error } = useQuery(["events"], getEvents, {
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
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

    return (
        <section className="py-10 px-5 font-poppins bg-black text-white">
            <h1 className="text-4xl font-semibold text-center mb-10">Featured Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
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
                            <span className="block text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full mb-2">{formatDate(event.date)} | {event.location}</span>
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


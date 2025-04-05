import React, { useEffect, useState } from "react";
import axios from "axios";

const Favourites = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFavourites = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get("http://localhost:5000/api/user/fetch-fav", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("API Response:", response.data);

                if (response.data.success) {
                    setEvents(response.data.events);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError("Error fetching favourites");
            }
        };

        fetchFavourites();
    }, []);

    return (
        <div className="bg-black text-white font-poppins min-h-screen p-10">
            <h1 className="text-4xl text-center font-semibold mb-16">Your Favourite Clubs Events</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex flex-wrap justify-center gap-6">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <div key={index} className="bg-gray-900 rounded-2xl text-white overflow-hidden w-80">
                            <a href={`/event/${event._id}`}>
                                <img className="hover:scale-110 transition-all duration-300 w-full h-48 object-cover rounded-t-2xl" src={event.coverImage.url} alt={event.name} />
                                <div className="p-4">
                                    <p className="text-xl">{event.name}</p>
                                    <p className="text-sm mt-2">{event.short_description}</p>
                                    <button className="mt-3 text-base hover:underline hover:scale-110 transition-all duration-300">View Event</button>
                                </div>
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg">No events found for your favourite clubs.</p>
                )}
            </div>
        </div>
    );
};

export default Favourites;

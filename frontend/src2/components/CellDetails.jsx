import React from "react";
import { useParams } from "react-router-dom";
import cells from "../data/cells";
import { getEventsByCell } from "../api/events";
import { useEffect, useState } from "react";
import "tailwindcss";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const CellDetails = () => {
  const { id } = useParams();
  const cell = cells.find((e) => e.id.toString() === id);

  const [events, setEvents] = useState([]);
  const [lastIndex, setLastIndex] = useState(3);
  const [buttonText, setButtonText] = useState("View all");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [messageKey, setMessageKey] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEventsByCell(cell.id);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  if (!cell) {
    return <h1 className="text-white text-center mt-10">Cell Not Found</h1>;
  }

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  useEffect(() => {
    const checkIfSubscribed = async () => {
      const token = localStorage.getItem("token");
      if (!token || !cell) return;

      try {
        const response = await axios.get(`https://testproject-k2cs.onrender.com/api/user/isfav/${cell.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setSubscribed(response.data.isFavorite);
        }
      } catch (err) {
        console.error("Error checking favorite status:", err);
      }
    };

    checkIfSubscribed();
  }, [cell]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSuccess('');

    const token = localStorage.getItem("token");
    if (!token) {
      setError('Please log in first.');
      return;
    }

    try {
      console.log("Sending request to backend...");
      const response = await axios.post('https://testproject-k2cs.onrender.com/api/user/fav',
        { clubID: cell.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response from backend:", response.data);

      if (response.data.success) {
        setSuccess(response.data.message);
        setError('');
        setSubscribed(true);
      } else {
        setError(response.data.message);
        setMessageKey(prevKey => prevKey + 1);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
      setMessageKey(prevKey => prevKey + 1);
      setSuccess('');
    }
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    setSuccess('');
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      const response = await axios.post(
        'https://testproject-k2cs.onrender.com/api/user/unfav',
        { clubID: cell.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        setError('');
        setSubscribed(false);
      } else {
        setError(response.data.message);
        setMessageKey(prevKey => prevKey + 1);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.');
      setMessageKey(prevKey => prevKey + 1);
      setSuccess('');
    }
  };

  return (
    <div className="bg-black text-white font-poppins">
      {/* Empty spacing on top */}
      <div className="h-16 bg-black"></div>

      {/* Banner Image */}
      <div className="mx-auto mb-12 h-[50vh] w-11/12 md:w-3/4">
        <img className="h-full w-full object-fill rounded-xl" src={cell.img} alt={cell.name} />
      </div>

      {/* Cell Info Section */}
      <div className="flex flex-col md:flex-row justify-between mx-auto w-11/12 md:w-4/5">
        <div className="md:w-1/2 text-3xl font-semibold">
          <AnimatePresence>
            {(success || error) && (
              <motion.div
                key={messageKey}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`fixed top-24 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[400px] px-6 py-4 rounded-2xl shadow-xl text-white z-50 ${success
                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                  : "bg-gradient-to-r from-red-500 to-rose-600"
                  }`}
              >
                <div className="flex items-center justify-center gap-3 text-lg font-semibold tracking-wide">
                  <span className="text-xl">
                    {success ? "✅" : "❌"}
                  </span>
                  <span>{success || error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <p>{cell.name},</p>
          <p>IIT Kanpur</p>
          {subscribed === undefined ? (
            <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-2xl mt-6"></div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={subscribed ? handleUnsubscribe : handleSubscribe}
              className="w-32 h-10 cursor-pointer bg-white rounded-2xl mt-6 text-black text-sm border border-transparent hover:border-black"
            >
              {subscribed ? "UNSUBSCRIBE" : "SUBSCRIBE"}
            </motion.button>
          )}
        </div>

        <div className="md:w-1/2 mt-4 text-base">
          <p>{cell.longDesc}</p>
        </div>
      </div>

      {/* Events Section */}
      <p className="text-5xl text-center font-bold mt-16">Events By {cell.name}</p>

      <div className="mt-14 flex flex-wrap justify-center gap-6 px-4">
        {events.length > 0 ? (
          <>
            {events.slice(0, lastIndex).map((event, index) => (
              <div key={index} className="bg-[#282424] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-2xl text-white overflow-hidden">
                <a href={`/event/${event._id}`}>
                  <img className="hover:scale-110 transition-all duration-300 w-full h-48 object-cover rounded-t-2xl" src={event.coverImage?.url} alt="Event" />
                  <div className="p-4">
                    <p className="text-lg font-semibold">{event.eventName}</p>
                    <p className="text-sm mt-2 text-gray-400">{event.short_description}</p>
                    <button className="cursor-pointer mt-3 text-sm hover:underline hover:scale-110 transition-all duration-300">View Event</button>
                  </div>
                </a>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-400 text-center w-full">No events available</p>
        )}
      </div>

      {/* View All Button */}
      {events.length > 0 && (
        <div className="w-full mt-10">
          <button
            onClick={() => {
              if (lastIndex === events.length + 1) {
                setLastIndex(3); // Reset to 3 if all events are shown
                setButtonText("View all"); // Reset button text to "View all"
              } else {
                setLastIndex(events.length + 1); // Increment the last index by 3 on button click
                setButtonText("View less"); // Change button text to "View less"
              }
            }}
            className="cursor-pointer block mx-auto bg-[#282424] text-white px-4 py-2 rounded-3xl">{buttonText}</button>
        </div>
      )}

      {/* Coordinators Section */}
      <div className="py-8 px-4 bg-black text-white mx-auto">
        <p className="text-5xl font-bold text-center">Coordinators</p>

        <div className=" mt-8 flex flex-row justify-around">
          {cell?.coordinators?.map((coordinator, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-neutral-900 p-4 rounded-lg shadow-md"
            >
              <img
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
                src={coordinator.img}
                alt={coordinator.name}
              />
              <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
                <p className="text-lg font-semibold">
                  Name: <span className="italic font-normal">{coordinator.name}</span>
                </p>
                <p className="text-lg font-semibold mt-1">
                  Email: <span className="italic font-normal">{coordinator.email}</span>
                </p>
                <p className="text-base mt-1 text-gray-300">Cell Coordinator</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default CellDetails;


import React from "react";
import { useParams } from "react-router-dom";
import cells from "../data/cells";
import { getEventsByCell } from "../api/events";
import { useEffect, useState } from "react";
import "tailwindcss";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from 'react-confetti';

const CellDetails = () => {
  const { id } = useParams();
  const cell = cells.find((e) => e.id.toString() === id);

  const [events, setEvents] = useState([]);
  const [lastIndex, setLastIndex] = useState(3); // State to track the last index of events
  const [buttonText, setButtonText] = useState("View all"); // State to track button text
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [messageKey, setMessageKey] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEventsByCell(cell.id); // Fetch events by club ID
        setEvents(response.data); // Set the events state with the fetched data
        console.log(response.data); // Log the fetched events for debugging

      } catch (error) {
        console.error("Error fetching events:", error); // Log any errors
      }
    };
    fetchEvents();
  } // Call the fetch function on component mount
    , []);

  if (!cell) {
    return <h1 className="text-white text-center mt-10">Cell Not Found</h1>;
  }
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);


  useEffect(() => {
    const checkIfSubscribed = async () => {
      const token = localStorage.getItem("token");
      if (!token || !cell) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/user/isfav/${cell.id}`, {
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


  if (!cell) {
    return <h1 className="text-white text-center mt-10">cell Not Found</h1>;
  }
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
      const response = await axios.post('http://localhost:5000/api/user/fav',
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
        'http://localhost:5000/api/user/unfav',
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
        <img className="h-full w-full object-fill rounded-xl" src={cell.imgSrc} alt={cell.name} />
      </div>

      {/* Cell Info Section */}
      <div className="flex flex-col md:flex-row justify-between mx-auto w-11/12 md:w-4/5">
        <div className="md:w-1/2 text-3xl font-semibold">
          {subscribed && success && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={3000}
              recycle={true}
            />
          )}
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
      <p className="text-4xl text-center font-semibold mt-16">Events By {cell.name}</p>

      <div className="mt-14 flex flex-wrap justify-center gap-6 px-4">
        {events.slice(0, lastIndex).map((event, index) => (

          <div key={index} className="bg-[#282424] w-full sm:w-1/2 md:w-1/4 rounded-2xl text-white overflow-hidden">
            <a href={`/events/${event._id}`}>
              <img className="hover:scale-110 transition-all duration-300 w-full h-64 object-cover rounded-t-2xl" src={event.coverImage.url} alt="Event" />
              <div className="p-5">
                <p className="text-2xl">{event.name}</p>
                <p className="text-sm mt-3">{event.short_description}</p>
                <button className="cursor-pointer mt-5 text-base hover:underline hover:scale-110 transition-all duration-300 w-">View Event</button>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="w-full mt-10">
        <button
          onClick={() => {
            if (lastIndex === events.length + 1) {
              setLastIndex(3); // Reset to 3 if all events are shown
              setButtonText("View all"); // Reset button text to "View all"
            } else {
              setLastIndex(events.length + 1); // Increment the last index by 3 on button click
              setButtonText("View less"); // Change button text to "View less"
            } // Increment the last index by 3 on button click
          }}
          className="cursor-pointer block mx-auto bg-[#282424] text-white px-4 py-2 rounded-3xl">{buttonText}</button>
      </div>

      {/* Coordinators Section */}
      <div className="mt-16 px-8">
        <p className="text-4xl font-medium text-center">Coordinators</p>
        <div className="mt-10 flex flex-col md:flex-row flex-wrap justify-center items-center gap-8">
          {cell.coordinators.map((coordinator, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-12 p-5 rounded-xl w-full md:w-3/4 lg:w-1/2 bg-gray-900">
              <img className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover" src={coordinator.img} alt={coordinator.name} />
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="text-xl font-semibold">Name: <span className="italic font-normal">{coordinator.name}</span></p>
                <p className="text-xl font-semibold mt-2">Email: <span className="italic font-normal">{coordinator.email}</span></p>
                <p className="text-lg mt-2">Cell Coordinator</p>
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
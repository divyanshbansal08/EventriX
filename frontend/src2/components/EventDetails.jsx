import React from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/events";
import { useEffect, useState } from "react";
import councilClubsData from "../data/councilClubs";
import councils from "../data/councils";
import cells from "../data/cells";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "tailwindcss";

const EventDetails = () => {

  // get events  from backend
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState('');
  const [success, setSuccess] = useState('');
  const [messageKey, setMessageKey] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id); // Fetch event by ID
        setEvent(response.data); // Set the event state with the fetched data
        console.log(response.data); // Log the fetched event for debugging
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching event:", error); // Log any errors
        setError(error); // Set error state
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchEvent(); // Call the fetch function on component mount
  }
    , []); // Dependency array to re-fetch if event ID changes

  if (loading) {
    return <h1 className="text-white text-center mt-10">Loading...</h1>; // Show loading state
  }
  if (error) {
    return <h1 className="text-white text-center mt-10">Error fetching event</h1>; // Show error state
  }

  const handleNotify = async (e) => {
    e.preventDefault();
    setSuccess('');

    const token = localStorage.getItem("token");
    if (!token) {
      setError2('Please log in to get notified.');
      setMessageKey(prevKey => prevKey + 1);
      return;
    }

    try {
      console.log("Sending request to backend...");
      const response = await axios.post('http://localhost:5000/api/user/notify-event',
        { _id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response from backend:", response.data);

      if (response.data.success) {
        setSuccess(response.data.message);
        setError2('');
      } else {
        setError2(response.data.message);
        setMessageKey(prevKey => prevKey + 1);
      }
    } catch (error) {
      console.log("Notify error response:", error.response);

      if (error.response && error.response.data.message) {
        setError2(error.response.data.message);
      } else {
        setError2('An error occurred. Please try again.');
      }
      setMessageKey(prevKey => prevKey + 1);
      setSuccess('');
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateString));
  };


  const clubID = event.clubID;
  let club = null;
  if (clubID < 64) {
    if (clubID < 17) {
      club = councilClubsData[0].clubs.find(club => club.id.toString() === clubID) // Add event to the respective council club
    }
    else if (clubID < 34) {
      club = councilClubsData[1].clubs.find(club => club.id.toString() === clubID) // Add event to the respective council club
    }
    else if (clubID < 56) {
      club = councilClubsData[2].clubs.find(club => club.id.toString() === clubID) // Add event to the respective council club
    }
    else {
      club = councilClubsData[3].clubs.find(club => club.id.toString() === clubID) // Add event to the respective council club
    }
  }
  else if (clubID < 68) {
    club = councils.find(club => club.id.toString() === clubID) // Add event to the respective council club
  }
  else {
    club = cells.find(club => club.id.toString() === clubID) // Add event to the respective council club
  }



  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-5 md:px-32 font-poppins">
        <div className="w-full">
          <div className="w-full rounded-xl overflow-hidden flex justify-center ">
            <img
              src={event.coverImage?.url}
              alt="Event Banner"
              className="w-full object-fill h-[20%]"
            />
          </div>

          <div className="mt-8 px-3">
            <h1 className="text-4xl font-bold">{event.eventName}</h1>
            <p className="mt-4 text-gray-300 text-lg">
              {event.description}
            </p>
            <button className="bg-gray-800 rounded-2xl mt-6 text-white px-4 py-2 text-sm transition-transform hover:scale-110 border border-transparent hover:border-black"
              onClick={handleNotify}
            >Notify Me</button>
            <div style={{ position: "relative" }}>
              <AnimatePresence mode="wait">
                {error2 && (
                  <motion.div
                    key={messageKey}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0 }}
                    className="login_message login_message-error"
                    style={{
                      position: "absolute",
                      top: "-60px",
                      left: "15%",
                      textAlign: "center",
                      pointerEvents: "none"
                    }}
                  >
                    {error2}
                  </motion.div>
                )}
              </AnimatePresence>
              {success && (
                <div
                  className="login_message login_message-success"
                  style={{
                    position: "absolute",
                    top: "-60px",
                    left: "15%",
                    textAlign: "center",
                    pointerEvents: "none"
                  }}
                >
                  {success}
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 border-t border-gray-600 pt-4 mx-3">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold text-xl">Date</span>
                <span className="text-white text-lg">{formatDate(event.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold text-xl">Venue</span>
                <span className="text-white text-lg">{event.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold text-xl">Time</span>
                <span className="text-white text-lg">{event.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 m-black px-8 bg-black text-white">
        <p className="text-4xl font-medium text-center">Coordinators</p>
        <div className="mt-10 flex flex-col md:flex-row flex-wrap justify-center items-center gap-8">
          {club?.coordinators?.map((coordinator, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center bg-gray-900 p-5 rounded-xl w-full md:w-3/4 lg:w-1/2">
              <img className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover" src={coordinator.img} alt={coordinator.name} />
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="text-xl font-semibold">Name: <span className="italic font-normal">{coordinator.name}</span></p>
                <p className="text-xl font-semibold mt-2">Email: <span className="italic font-normal">{coordinator.email}</span></p>
                <p className="text-lg mt-2">Council Coordinator</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default EventDetails;
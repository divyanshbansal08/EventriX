import React from "react";
import { useParams } from "react-router-dom";
import councils from "../data/councils";
import { getEventsByCouncil } from "../api/events";
import { useEffect, useState } from "react";
import "tailwindcss";

const CouncilDetails = () => {
  const { id } = useParams();
  const council = councils.find((e) => e.id.toString() === id);

  const [events, setEvents] = useState([]);
  const [lastIndex, setLastIndex] = useState(3);
  const [buttonText, setButtonText] = useState("View all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEventsByCouncil(council.id);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!council) {
      const storedCouncil = sessionStorage.getItem(`council-${id}`);
      if (storedCouncil) {
        setClub(JSON.parse(storedCouncil));
      }
    } else {
      sessionStorage.setItem(`council-${id}`, JSON.stringify(council));
    }
  }, [council]);

  if (!council) {
    return <h1 className="text-white text-center mt-10">Council Not Found</h1>;
  }

  return (
    <div className="bg-black text-white font-poppins">
      {/* Empty spacing on top */}
      <div className="h-16 bg-black"></div>

      {/* Banner Image */}
      <div className="mx-auto mb-12 h-[60vh] w-11/12 md:w-3/4">
        <img className="h-full w-full object-fill rounded-xl" src={council.imgSrc} alt={council.name} />
      </div>

      {/* Council Info Section */}
      <div className="flex flex-col md:flex-row justify-between mx-auto w-11/12 md:w-4/5">
        <div className="md:w-1/2 text-3xl font-semibold">
          <p>{council.name},</p>
          <p>IIT Kanpur</p>
        </div>

        <div className="md:w-1/2 mt-4 text-base">
          <p>{council.longDesc}</p>
        </div>
      </div>

      {/* Events Section */}
      <p className="text-5xl text-center font-bold mt-16">Events By {council.name}</p>

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
          {council?.coordinators?.map((coordinator, index) => (
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
                <p className="text-base mt-1 text-gray-300">Council Coordinator</p>
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

export default CouncilDetails;
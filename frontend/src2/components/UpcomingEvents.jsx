import React, { useState } from 'react';
import "tailwindcss";

const events = [
  {
    tag: "#cricket",
    title: "Cricket Championship",
    description:
      "Exciting cricket tournament with fierce competition, teamwork, and thrilling matches.",
    image: "images/antaragni.png",
  },
  {
    tag: "#musicislife",
    title: "Musical Extravaganza",
    description:
      "A lively celebration of music, with unforgettable melodies and energy.",
    image: "images/antaragni.png",
  },
  {
    tag: "#codeit",
    title: "Fresher's Hackathon",
    description:
      "A hackathon for freshers to innovate, collaborate, and showcase their coding skills.",
    image: "images/image3.png",
  },
  {
    tag: "#theater",
    title: "Drama Night",
    description:
      "Experience the power of storytelling in this unforgettable drama performance.",
    image: "images/image4.png",
  },
  {
    tag: "#dance",
    title: "Dance Fiesta",
    description:
      "An electrifying dance event that brings together incredible performers.",
    image: "images/image5.png",
  },
  {
    tag: "#dance",
    title: "Dance Fiesta",
    description:
      "An electrifying dance event that brings together incredible performers.",
    image: "images/image5.png",
  },
  {
    tag: "#dance",
    title: "Dance Fiesta",
    description:
      "An electrifying dance event that brings together incredible performers.",
    image: "images/image5.png",
  },
  {
    tag: "#dance",
    title: "Dance Fiesta",
    description:
      "An electrifying dance event that brings together incredible performers.",
    image: "images/image5.png",
  },
];

export default function UpcomingEvents() {
  // With 3 events visible at once, maximum slide index is events.length - 3
  const maxSlide = events.length - 3;
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index) => {
    if (index < 0) {
      setCurrentSlide(maxSlide);
    } else if (index > maxSlide) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(index);
    }
  };

  return (
    <section className="bg-black py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-4">
          Upcoming Events
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Experience unforgettable moments with our latest events designed to inspire and entertain.
        </p>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{ transform: translateX(var(--tx)) }}
            >
            {events.map((event, index) => (
              <div key={index} className="w-1/3 flex-shrink-0">
                <div className="bg-gray-900 rounded-xl flex flex-col h-full hover:shadow-xl transition-shadow">
                  {/* Image Section */}
                  <div className="overflow-hidden rounded-t-xl">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-1 space-y-3">
                    <span className="bg-gray-800 text-sm font-medium text-gray-300 px-3 py-1 rounded-full inline-block">
                      {event.tag}
                    </span>
                    <h2 className="text-2xl font-semibold text-gray-100">
                      {event.title}
                    </h2>
                    <p className="text-gray-400 flex-1">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => goToSlide(currentSlide - 1)}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-gray-100 hover:bg-gray-700 transition-colors"
        >
          &#10094;
        </button>
        <button
          onClick={() => goToSlide(currentSlide + 1)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-gray-100 hover:bg-gray-700 transition-colors"
        >
          &#10095;
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? "bg-gray-100" : "bg-gray-600"
              }`}
          ></button>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <a
          href="all_event.html"
          className="border border-gray-100 text-gray-100 px-6 py-3 rounded-full text-lg font-medium transition-all hover:bg-gray-100 hover:text-black"
        >
          View All
        </a>
      </div>
    </div>
    </section >
  );
}
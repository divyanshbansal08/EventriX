import React from "react";
import { Link } from "react-router-dom";
import councils from "../data/councils.js";
import "tailwindcss";

const CouncilList = () => {
  return (
    <div className="bg-black text-center p-5 font-poppins">
      <h1 className="mb-8 text-4xl mt-5 text-white font-semibold">Councils</h1>
      {councils.map((council, index) => (
        <div
          key={index}
          className="flex flex-col-reverse md:flex-row items-center bg-neutral-900 p-5 md:p-10 my-5 mx-auto w-11/12 md:w-4/5 h-auto rounded-3xl"
        >
          <div className="text-left w-full md:w-1/2 text-white pl-6 mr-16">
            <h2 className="text-3xl font-medium">{council.name}</h2>
            <h2 className="text-3xl mt-1 mb-3 font-medium">{council.keyword}</h2>
            <p className="text-base">{council.shortDesc}</p>

            <div className="mt-4 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 gap-2">
              <Link to={`/councils/clubs/${council.tag}`}>
                <button className="bg-white text-black px-4 py-2 font-bold rounded-xl transition-transform hover:scale-110 border border-transparent hover:border-black">
                  Explore Clubs
                </button>
              </Link>
              <Link to={`/councils/${council.id}`}>
                <button className="bg-white text-black px-4 py-2 font-bold rounded-xl transition-transform hover:scale-110 border border-transparent hover:border-black">
                  See More &gt;
                </button>
              </Link>
            </div>
          </div>

          <img
            src={council.imgSrc}
            alt={`${council.name} Logo`}
            className="w-full md:w-1/3 h-auto max-h-[220px] rounded-lg mb-4 md:mb-0 md:ml-10"
          />
        </div>
      ))}
    </div>
  );
};

export default CouncilList;

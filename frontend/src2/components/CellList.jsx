import React from "react";
import { Link } from "react-router-dom";
import cells from "../data/cells.js";
import "tailwindcss";

const CellList = () => {
  return (
    <div className="bg-black text-center p-5 font-poppins">
      <h1 className="mb-8 text-4xl mt-5 text-white font-semibold">Cells</h1>
      {cells.map((cell, index) => (
        <div
          key={index}
          className="flex flex-col-reverse md:flex-row items-center bg-[#1a1a1a] p-5 md:p-10 my-5 mx-auto w-11/12 md:w-4/5 h-auto rounded-3xl"
        >
          <div className="text-left w-full md:w-1/2 text-white pl-6 mr-16">
            <h2 className="text-3xl font-medium">{cell.name}</h2>
            <h2 className="text-3xl mt-1 mb-3 font-medium">{cell.keyword}</h2>
            <p className="text-base">{cell.shortDesc}</p>

            <div className="mt-4 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 gap-2">
              <Link to={`/cells/${cell.id}`}>
                <button className="bg-white text-black px-4 py-2 font-bold rounded-xl transition transform hover:bg-white hover:text-black hover:scale-110 border border-transparent hover:border-black">
                  See More &gt;
                </button>
              </Link>
            </div>
          </div>

          <img
            src={cell.img}
            alt={`${cell.name} Logo`}
            className="w-full sm:w-3/4 md:w-1/3 h-[220px] rounded-lg mb-4 md:mb-0 md:ml-10"
          />
        </div>
      ))}
    </div>
  );
};

export default CellList;
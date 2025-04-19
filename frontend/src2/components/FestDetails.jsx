import React from 'react'
import { useParams } from "react-router-dom";
import fests from '../data/fests.js';
import "tailwindcss";

const FestDetails = () => {
  const { tag } = useParams();
  const fest = fests.find((e) => e.tag.toString() === tag);
  console.log(fest);

  if (!fest) {
    return <h1 className="text-white text-center mt-10">Event Not Found</h1>;
  }

  return (
    <>
      <div className="bg-black text-white">
        <div className="bg-black font-poppins">
          <div className="h-16 bg-black">
          </div>

          <div className="mx-auto mb-12 h-[50vh] w-11/12 md:w-3/4">
            <img className="h-full w-full object-fill rounded-xl" src={fest.img} alt={fest.name} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mx-auto w-11/12 md:w-4/5">
        <div className="md:w-1/2 text-3xl font-semibold">
          <p>{fest.name},</p>
          <p>IIT Kanpur</p>
        </div>

        <div className="md:w-1/2 mt-4 text-base">
          <p>{fest.longDesc}</p>
        </div>
      </div>

        <p className="text-5xl text-white text-center mt-16 font-bold">
          Events Calendar
        </p>
        <div className="flex justify-center mt-12">
          <div className="mx-16 flex flex-wrap justify-center">
            <img className="w-[35%] object-fill mx-10 mb-10 rounded-4xl" src="/antaragini1.png"></img>
            <img className="w-[35%] object-fill mx-10 mb-10 rounded-4xl" src="/antaragini2.png"></img>
            <img className="w-[35%] object-fill mx-10 mb-10 rounded-4xl" src="/antaragini3.png"></img>
            <img className="w-[35%] object-fill mx-10 mb-10 rounded-4xl" src="/antaragini4.png"></img>
          </div>
        </div>

        <div className="py-8 px-4 bg-black text-white mx-auto">
        <p className="text-5xl font-bold text-center">Coordinators</p>

        <div className=" mt-8 flex flex-row justify-around">
          {fest?.coordinators?.map((coordinator, index) => (
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
                <p className="text-base mt-1 text-gray-300">Festival Coordinator</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  )
}


function Coordinators({ name }) {

  return (
    <div className="text-white ml-11  h-52 flex mb-12">
      <img className="object-fill w-[33%] h-[90%] rounded-[50%]" src="#"></img>
      <div className="pl-8">
        <p className="text-4xl font-semibold mt-6">{name}</p>
        <p className="mt-6 text-sm">Festival coordinators</p>
      </div>
    </div>
  )
}


export default FestDetails;
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

        <div className=" flex text-white">
          <p className=" mr-10 w-64 ml-32 text-3xl">
            {fest.name}, IIT Kanpur
          </p>

          <div className="ml-12 mr-32 mb-44">
            <div className="h-6"> </div>
            <p className="text-sm">{fest.longDesc}</p>
          </div>

        </div>

        <p className="text-4xl text-white text-center">
          Events Calendar
        </p>
        <div className="flex justify-center mt-12">
          <div className="mx-16 flex flex-wrap justify-evenly">
            <img className="w-[45%] object-fill mb-6" src="/images/schedule.png"></img>
            <img className="w-[45%] object-fill mb-6" src="/images/schedule.png"></img>
            <img className="w-[45%] object-fill mb-6" src="/images/schedule.png"></img>
            <img className="w-[45%] object-fill mb-6" src="/images/schedule.png"></img>
          </div>
        </div>

        <div className="mt-16 px-8">
          <p className="text-4xl text-center font-medium">Festival Coordinators</p>
          <div className="mt-10 flex flex-col md:flex-row flex-wrap justify-center items-center gap-8">
            {fest.coordinators.map((coordinator, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-12 p-5 rounded-xl w-full md:w-3/4 lg:w-1/2 bg-gray-900">
                <img className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover" src={coordinator.img} alt={coordinator.name} />
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="text-xl font-semibold">Name: <span className="italic font-normal">{coordinator.name}</span></p>
                  <p className="text-xl font-semibold mt-2">Email: <span className="italic font-normal">{coordinator.email}</span></p>
                  <p className="text-lg mt-2">Festival Coordinator</p>
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
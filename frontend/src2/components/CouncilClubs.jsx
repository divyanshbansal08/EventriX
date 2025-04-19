import React from "react";
// import "../index.css";
import { useParams } from "react-router-dom";
import councilClubsData from "../data/councilClubs.js";
// import { useNavigate } from 'react-router-dom'

// const navigate = useNavigate()
import "tailwindcss";


const ClubCard = ({ club }) => {
  return (
    // <a
    //   href={club.link}
    //   className="block bg-neutral-900 rounded-xl overflow-hidden text-white hover:shadow-lg transform hover:-translate-y-2 transition-all"
    // >
    //   <img src={club.img} alt={club.name} className="w-full h-48 object-fill" />
    //   <div className="p-4">
    //     <p className="text-xl font-semibold mb-2 pb-2">{club.name}</p>
    //     <p className="text-gray-400 text-sm">{club.shortDesc}</p>
    //     <span className="cursor-pointer block text-blue-400 mt-3"
    //     // onClick={() => navigate(`/councils/${club.id}`, {replace: true})}
    //     >View Club →</span>
    //   </div>
    // </a>
      <a
        href={club.link}
        className="block bg-neutral-900 rounded-xl overflow-hidden text-white hover:shadow-lg transform hover:-translate-y-2 transition-all relative h-full pb-12" /* Extra padding for the link */
      >
        <img src={club.img} alt={club.name} className="w-full h-48 object-fill" />
        <div className="p-4">
          <p className="text-2xl font-semibold mb-2 pb-2">{club.name}</p>
          <p className="text-gray-400 text-sm">{club.shortDesc}</p>
        </div>
        <span className="absolute bottom-4 left-4 cursor-pointer text-white text-xl">View Club →</span>
      </a>
  );
};

const CouncilClubs = () => {

  const { tag } = useParams();
  const council = councilClubsData.find((e) => e.tag.toString() === tag);
  console.log(council);

  return (
    <div className="min-h-screen bg-black text-white py-10 px-5">
      <h1 className="text-5xl font-bold text-center mb-10">{council.tag.toUpperCase()} Clubs</h1>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {council.clubs.map((club, index) => (<>
          <ClubCard key={club.id} club={club} />
        </>


        ))}
      </div>
    </div>
  );
};

export default CouncilClubs;
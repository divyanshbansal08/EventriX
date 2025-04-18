import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import fests from "../data/fests.js";
import "tailwindcss";
import Logo_main from "../../src/Homepage/components_Homepage/Logo_main.jsx";

const FestList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Logo_main onLogout={() => {}} onLogin={() => {}} isLoggedIn={isLoggedIn} />
      <div className="text-center p-5 font-poppins">
        <h1 className="mb-8 text-4xl mt-5 text-white font-semibold">Fests</h1>
        {fests.map((fest, index) => (
          <motion.div
            key={index}
            className="flex flex-col-reverse md:flex-row items-center bg-neutral-900 p-5 md:p-10 my-5 mx-auto w-11/12 md:w-4/5 h-auto rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ 
              type: "spring", 
              stiffness: 200,
              damping: 15,
              mass: 0.5
            }}
          >
            <div className="text-left w-full md:w-1/2 text-white pl-6 mr-16">
              <h2 className="text-3xl font-medium">{fest.name}</h2>
              <h2 className="text-3xl mt-1 mb-3 font-medium">{fest.keyword}</h2>
              <p className="text-base">{fest.shortDesc}</p>

              <div className="mt-4 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 gap-2">
                <Link to={`/fests/${fest.tag}`}>
                  <button className="cursor-pointer bg-white text-black px-4 py-2 font-bold rounded-xl transition-transform hover:scale-110 border border-transparent hover:border-black">
                    See More &gt;
                  </button>
                </Link>
              </div>
            </div>

            <img
              src={fest.img}
              alt={`${fest.name} Logo`}
              className="w-full md:w-1/3 h-auto max-h-[220px] rounded-lg mb-4 md:mb-0 md:ml-10"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FestList;
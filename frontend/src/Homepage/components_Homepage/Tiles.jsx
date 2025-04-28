import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Tiles = () => {
  const location = useLocation();


  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/councils', label: 'Councils' },
    { path: '/cells', label: 'Cells' },
    { path: '/fests', label: 'Fests' }
  ];

  return (
    <div className="flex justify-center items-center space-x-8">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path ||
          (item.path === 'home' && location.pathname === '/');

        return (
          <Link
            key={item.path}
            to={item.path}
            className="relative"
          >
            <motion.div
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${isActive
                ? 'bg-white/40 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
                }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item.label}
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default Tiles;
// src/Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-900 text-white p-4 shadow-md">
      <h1 className="text-3xl pl-5 font-serif font-bold ">
        CollabAt
      </h1>
      <div className="flex space-x-4">
        <Link to="/" className="flex items-center space-x-1 hover:text-red-200">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/" className="flex items-center space-x-1 hover:text-red-200">
          <FaSignOutAlt />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

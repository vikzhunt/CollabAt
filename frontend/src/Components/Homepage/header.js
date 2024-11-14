// src/Components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ scrollToAbout }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="text-3xl font-bold text-blue-700">
            <Link to="/" className="text-blue-600 hover:text-blue-700 transition">
              Collab<span className="font-extrabold text-sky-500">At</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="space-x-8 flex items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 border-2 border-white hover:border-blue-600 px-3 py-1 rounded-lg transition duration-200 text-lg"
            >
              Home
            </Link>
            <Link
              to="/eventslist"
              className="text-gray-700 hover:text-blue-600 border-2 border-white hover:border-blue-600 px-3 py-1 rounded-lg transition duration-200 text-lg"
            >
              Events
            </Link>
            <button
              onClick={scrollToAbout}
              className="text-gray-700 hover:text-blue-600 border-2 border-white hover:border-blue-600 px-3 py-1 rounded-lg transition duration-200 text-lg"
            >
              About
            </button>
            <Link
              to="/login"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition duration-200"
            >
              Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

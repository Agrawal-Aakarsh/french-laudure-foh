import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              French Laudure
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 
                ${isActive('/') 
                  ? 'bg-white text-purple-600' 
                  : 'text-white hover:bg-purple-500'}`}
            >
              Dashboard
            </Link>
            <Link
              to="/guests"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 
                ${isActive('/guests') 
                  ? 'bg-white text-purple-600' 
                  : 'text-white hover:bg-purple-500'}`}
            >
              Guest Profiles
            </Link>
          </div>

          {/* Right side - could add user profile, notifications, etc */}
          <div className="flex items-center">
            <span className="text-white text-sm">
              Morning Huddle Dashboard
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
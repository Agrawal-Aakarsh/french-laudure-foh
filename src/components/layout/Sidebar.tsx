import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-primary/10' : 'hover:bg-primary/10';
  };

  return (
    <aside className="w-64 border-r min-h-screen p-4">
      <nav className="space-y-2">
        <Link 
          to="/" 
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isActive('/')}`}
        >
          <span>Dashboard</span>
        </Link>
        <Link 
          to="/guests" 
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isActive('/guests')}`}
        >
          <span>Guest Profiles</span>
        </Link>
        <Link 
          to="/service-notes" 
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isActive('/service-notes')}`}
        >
          <span>Service Notes</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;